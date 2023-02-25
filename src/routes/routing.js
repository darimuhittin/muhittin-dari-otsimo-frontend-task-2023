import { lazy, Suspense } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navigation from 'common/components/Navigation'
import store from 'app/store'
import { Provider } from 'react-redux'
import Footer from 'common/components/Footer/Footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import MobileMenu from '../common/components/MobileMenu'
const Welcome = lazy(() => import('features/Welcome'))
const MealList = lazy(() => import('features/MealList'))

const MealPage = lazy(() => import('features/MealPage'))

const NotFound = lazy(() => import('features/NotFound'))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
})

const routing = (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Topbar />
            <MobileHeader /> */}
          <Navigation />
          <MobileMenu />
          <Routes>
            {/* <Route exact path="/auth" component={AuthCmp} /> */}
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/meal-list" element={<MealList />} />
            <Route exact path="meals/:id" element={<MealPage />} />
            {/* <Route exact path="/products" element={<Products />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/tags" element={<Tags />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </Provider>
  </QueryClientProvider>
)

export default routing
