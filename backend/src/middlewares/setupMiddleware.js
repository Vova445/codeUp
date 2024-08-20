import userRoutes from '../routes/userRoutes.js'

export async function setupMiddlewares(app) {
   app.use('/api', userRoutes)
}
