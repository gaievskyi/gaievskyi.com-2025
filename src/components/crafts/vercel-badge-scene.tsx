/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei"
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from "@react-three/fiber"
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const cardGLB = "/models/tag.glb"
const texturePath = "/models/band.jpg"

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload(cardGLB)
useTexture.preload(texturePath)

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
  }
}

type BandProps = {
  maxSpeed?: number
  minSpeed?: number
}

function Band({ maxSpeed = 50, minSpeed = 10 }: BandProps) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<RapierRigidBody>(null!)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  }

  const { nodes, materials } = useGLTF(cardGLB)
  const texture = useTexture(texturePath)
  const { size } = useThree()

  const [curve] = useState(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    curve.curveType = "chordal"
    return curve
  })

  const [dragged, drag] = useState<false | THREE.Vector3>(false)

  const lineWidth = size.width < 768 ? 1 : 0.5

  useEffect(() => {
    if (texture) {
      const clonedTexture = texture.clone()
      clonedTexture.wrapS = THREE.RepeatWrapping
      clonedTexture.wrapT = THREE.RepeatWrapping
      clonedTexture.needsUpdate = true
      if (band.current) {
        const material = band.current.material
        if (!Array.isArray(material) && material) {
          ;(material as any).map = clonedTexture
          material.needsUpdate = true
        }
      }
    }
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [texture])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ])

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))

      for (const ref of [card, j1, j2, j3, fixed]) {
        ref.current?.wakeUp()
      }

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }

    if (fixed.current) {
      for (const ref of [j1, j2]) {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          )
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        )
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        )
      }

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())

      if (band.current?.geometry && "setPoints" in band.current.geometry) {
        ;(band.current.geometry as any).setPoints(curve.getPoints(32))
      }

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel(
        {
          x: ang.x,
          y: ang.y - rot.y * 0.25,
          z: ang.z,
        },
        false,
      )
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => {
              document.body.style.cursor = "grab"
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto"
            }}
            onPointerUp={(e) => {
              if (!e.target) return
              if (
                "releasePointerCapture" in e.target &&
                typeof e.target.releasePointerCapture === "function"
              ) {
                e.target.releasePointerCapture(e.pointerId)
              }
              document.body.style.cursor = "auto"
              drag(false)
            }}
            onPointerDown={(e) => {
              if (!e.target) return
              if (
                "setPointerCapture" in e.target &&
                typeof e.target.setPointerCapture === "function"
              ) {
                e.target.setPointerCapture(e.pointerId)
              }
              document.body.style.cursor = "grabbing"
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              )
            }}
          >
            <mesh geometry={(nodes as any).card.geometry}>
              <meshPhysicalMaterial
                map={(materials as any).base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={(nodes as any).clip.geometry}
              material={(materials as any).metal}
              material-roughness={0.3}
            />
            <mesh
              geometry={(nodes as any).clamp.geometry}
              material={(materials as any).metal}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        {/* @ts-expect-error meshline material typing issue */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap={1}
          map={texture}
          repeat={[-3, 1]}
          lineWidth={lineWidth}
        />
      </mesh>
    </>
  )
}

type VercelBadgeSceneProps = {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
}

export default function VercelBadgeScene({
  position = [0, 0, 13],
  gravity = [0, -40, 0],
  fov = 25,
  transparent = true,
}: VercelBadgeSceneProps) {
  return (
    <div className="absolute z-50 flex h-svh w-full origin-center scale-100 transform items-center justify-center sm:-mt-20">
      <Canvas
        fallback={<div>Sorry, no WebGL supported!</div>}
        camera={{ position, fov }}
        gl={{
          alpha: transparent,
          antialias: true,
          powerPreference: "default",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x00_00_00), transparent ? 0 : 1)
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60} interpolate>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  )
}
