import { pathToFileURL } from 'node:url'
import path from 'node:path'

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const mappedPath = path.join(process.cwd(), 'src', specifier.slice(2))
    const url = pathToFileURL(mappedPath).href
    return { url, shortCircuit: true }
  }
  return nextResolve(specifier, context)
} 