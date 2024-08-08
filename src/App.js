import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  publicRoutes,
  adminRoutes,
  popularRoutes,
  studentRoutes,
  staffRoutes,
  teacherRoutes,
} from "./pages/routes";
import ThemeProvider from "./theme";
import MainLayout from "./layouts/MainLayout";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import Authentication from "./Authentication";
import { DataConstants } from "./const";
import NotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicAuthentication from "./PublicAuthentication";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider>
          <ToastContainer limit={5} newestOnTop />
          <Routes>
            <Route element={<PublicAuthentication />}>
              {publicRoutes.map((route) => {
                const Page = route.element;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Suspense
                        fallback={
                          <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            <CircularProgress />
                          </Box>
                        }
                      >
                        <Page />
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
            <Route
              element={
                <Authentication
                  roles={[
                    DataConstants.ROLE.STUDENT,
                    DataConstants.ROLE.TEACHER,
                    DataConstants.ROLE.STAFF,
                    DataConstants.ROLE.ADMIN,
                  ]}
                />
              }
            >
              {popularRoutes.map((route) => {
                const PrivatePage = route.element;
                const Layout = route.layout || MainLayout;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CircularProgress />
                            </Box>
                          }
                        >
                          <PrivatePage />
                        </Suspense>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route
              element={<Authentication roles={[DataConstants.ROLE.STUDENT]} />}
            >
              {studentRoutes.map((route) => {
                const PrivatePage = route.element;
                const Layout = route.layout || MainLayout;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CircularProgress />
                            </Box>
                          }
                        >
                          <PrivatePage />
                        </Suspense>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route
              element={
                <Authentication
                  roles={[DataConstants.ROLE.TEACHER, DataConstants.ROLE.STAFF, DataConstants.ROLE.ADMIN]}
                />
              }
            >
              {teacherRoutes.map((route) => {
                const PrivatePage = route.element;
                const Layout = route.layout || MainLayout;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CircularProgress />
                            </Box>
                          }
                        >
                          <PrivatePage />
                        </Suspense>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route
              element={
                <Authentication
                  roles={[DataConstants.ROLE.STAFF, DataConstants.ROLE.ADMIN]}
                />
              }
            >
              {staffRoutes.map((route) => {
                const PrivatePage = route.element;
                const Layout = route.layout || MainLayout;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CircularProgress />
                            </Box>
                          }
                        >
                          <PrivatePage />
                        </Suspense>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route
              element={<Authentication roles={[DataConstants.ROLE.ADMIN]} />}
            >
              {adminRoutes.map((route) => {
                const PrivatePage = route.element;
                const Layout = route.layout || MainLayout;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CircularProgress />
                            </Box>
                          }
                        >
                          <PrivatePage />
                        </Suspense>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
