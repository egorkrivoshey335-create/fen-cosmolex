import type { FormEvent } from 'react'
import { useState } from 'react'
import App from './App.tsx'

const ACCESS_COOKIE_NAME = 'project-site-access'
const ACCESS_COOKIE_VALUE = 'granted'
const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30
const DEFAULT_SITE_PASSWORD = 'CosmoDev2026!'
const sitePassword = import.meta.env.VITE_SITE_PASSWORD?.trim() || DEFAULT_SITE_PASSWORD

function getCookieValue(name: string) {
  if (typeof document === 'undefined') {
    return null
  }

  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const [rawName, ...rawValue] = cookie.trim().split('=')

    if (rawName === name) {
      return rawValue.join('=')
    }
  }

  return null
}

function hasSavedAccess() {
  return getCookieValue(ACCESS_COOKIE_NAME) === ACCESS_COOKIE_VALUE
}

function saveAccessCookie() {
  document.cookie = [
    `${ACCESS_COOKIE_NAME}=${ACCESS_COOKIE_VALUE}`,
    `Max-Age=${ACCESS_COOKIE_MAX_AGE}`,
    'Path=/',
    'SameSite=Lax',
  ].join('; ')
}

function SiteAccessGate() {
  const [hasAccess, setHasAccess] = useState(() => hasSavedAccess())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.trim() !== sitePassword) {
      setError('Неверный пароль. Попробуйте еще раз.')
      return
    }

    saveAccessCookie()
    setError('')
    setHasAccess(true)
  }

  if (hasAccess) {
    return <App />
  }

  return (
    <main className="site-access">
      <div className="site-access__background" aria-hidden="true" />

      <section className="site-access__card" aria-labelledby="site-access-title">
        <p className="site-access__eyebrow">Временный доступ</p>
        <h1 className="site-access__title" id="site-access-title">
          Введите пароль
        </h1>
        <p className="site-access__description">
          Сайт находится на доработке. После ввода пароля доступ сохранится в cookie на этом
          устройстве, и повторно вводить его не придется.
        </p>

        <form className="site-access__form" onSubmit={handleSubmit}>
          <label className="site-access__label" htmlFor="site-password">
            Пароль
          </label>

          <input
            id="site-password"
            className="site-access__input"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (error) {
                setError('')
              }
            }}
            placeholder="Введите пароль"
            autoComplete="current-password"
            autoFocus
          />

          {error ? (
            <p className="site-access__error" role="alert">
              {error}
            </p>
          ) : (
            <p className="site-access__hint">Доступ запоминается на 30 дней на этом устройстве.</p>
          )}

          <button className="site-access__button" type="submit">
            Открыть сайт
          </button>
        </form>
      </section>
    </main>
  )
}

export default SiteAccessGate
