import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return ''
  }
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getUrl(path: string) {
  return `${getBaseUrl()}${path}`
}

export function range(start: number, end?: number, step: number = 1) {
  if (end === undefined) {
    end = start
    start = 0
  }
  const length = Math.max(Math.ceil((end - start) / step), 0)
  return Array.from({ length }, (_, index) => start + index * step)
}
