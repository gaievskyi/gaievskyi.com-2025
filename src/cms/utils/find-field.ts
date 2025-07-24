import type { Field } from "payload"

export function findField<T extends Field>(
  fields: Field[],
  name: string,
): T | null {
  for (const field of fields) {
    if ("name" in field && field.name === name) {
      return field as T
    } else if ("fields" in field) {
      let result: Field | null = null

      if ("name" in field) {
        const [n1, ...n] = name.split(".")
        if (field.name === n1) {
          result = findField(field.fields, n.join("."))
        }
      } else {
        result = findField(field.fields, name)
      }

      if (result) {
        return result as T
      } else {
        continue
      }
    } else if ("tabs" in field) {
      for (const tab of field.tabs) {
        let result: Field | null = null

        if ("name" in tab) {
          const [n1, ...n] = name.split(".")
          if (tab.name === n1) {
            result = findField(tab.fields, n.join("."))
          }
        } else {
          result = findField(tab.fields, name)
        }

        if (result) {
          return result as T
        } else {
          continue
        }
      }
    }
  }

  return null
}
