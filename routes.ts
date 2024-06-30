/**
 * Public routes array , dont need authentication
 */
export const publicRoutes = ["/"];
/**
 * Protected routes, need authentication
 */
export const authRoutes = ["/login", "/sign-up"];
/**
 * Prefix routes, need authentication
 */
export const apiAuthPrefix = "/api/auth";
/**
 * Default redirect route
 */
export const DEFAULT_REDIRECT_ROUTE = "/dashboard";
