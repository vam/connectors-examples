import { createFrontendConnector, createBackendConnector } from '@crudlio/crudl-connectors-base'
import { crudToHttp, url, transformData } from '@crudlio/crudl-connectors-base/lib/middleware'

const baseURL = 'https://reqres.in/api'

const base = urlPath => createFrontendConnector(createBackendConnector({ baseURL }))
    .use(crudToHttp()) // Map crud methods to http calls
    .use(url(urlPath)) // Use parametrized URLs (e.g. 'api/users/:id')

const users = base('users')
const user = base('users/:id')

// Create a new user
users.create({ data: { name: 'Vaclav Havel', job: 'President' }})
    .then((newUser) => {
        console.log(`User ${newUser.id} created`, newUser)
    })

// Get user 1
user(1).read()
    .then(result => console.log('User with id 1:', result))

// Update user 2
user(2).update({ data: { role: 'staff' }})
    .then(result => console.log('User with id 2 was updated:', result))

// Delete user 3
user(3).delete()
    .then(result => console.log('User with id 3 was deleted:', result))
