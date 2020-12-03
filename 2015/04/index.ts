import { Md5 } from 'ts-md5/dist/md5'

const defaultValidCheck = (hash: string): boolean => `${hash}`.substring(0,5) === '00000'

export const checkHash = function(key: string, n: number, validCheck: (hash: string) => boolean = defaultValidCheck): boolean {
  const hash = Md5.hashStr(`${key}${n}`)
  return validCheck(`${hash}`)
}

export const findLowestHash = function(key: string, validCheck: (hash: string) => boolean = defaultValidCheck): number {
  let num = 0

  while (checkHash(key, num, validCheck) === false) {
    num += 1
  }

  return num
}