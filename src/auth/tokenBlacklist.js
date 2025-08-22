import { RevokedToken } from '@/db/sequelize.js'

export async function blacklistToken(jti, expEpochSeconds) {
  if (!jti || !expEpochSeconds) return
  const expDate = new Date(expEpochSeconds * 1000)
  await RevokedToken.upsert({ jti, expAt: expDate })
}

export async function isTokenBlacklisted(jti) {
  if (!jti) return false
  const row = await RevokedToken.findByPk(jti)
  return !!row
} 