import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/Layout';
import { routeArray } from '@/config/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
{routeArray.map((route) => {
            const RouteComponent = route.component;
            return (
              <Route
                key={route.id}
                path={route.path}
                element={<RouteComponent />}
              />
            );
          })}
          {(() => {
            const IndexComponent = routeArray[0].component;
            return <Route index element={<IndexComponent />} />;
          })()}
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
        toastClassName="font-sans"
        progressClassName="bg-primary"
      />
    </BrowserRouter>
  );
}

export default App;