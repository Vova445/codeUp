import userRoutes from '../routes/userRoutes.js'

export async function setupMiddlewares(app) {
   app.use('/api/auth', authRoutes)
   app.use('/api', userRoutes)
   app.use('/api', uploadAvatarRoute)
}
