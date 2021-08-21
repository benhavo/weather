import React from 'react'
import Layout from './Layout'
import { Head } from '@inertiajs/inertia-react'

export default function Welcome({ user }) {
  return (
    <Layout>
      <Head title="Welcome" />
      <H1>Welcome</H1>
      <p>Hello {user.name}, welcome to your first Inertia app!</p>
    </Layout>
  )
}