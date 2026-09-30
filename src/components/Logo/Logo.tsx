import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="VSL Car Rental Georgia"
      width={130}
      height={52}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-10 w-auto object-contain', className)}
      src="/images/vsl-logo-black.png"
    />
  )
}
