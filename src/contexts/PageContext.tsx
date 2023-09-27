import { createContext } from "react";
import React from "react";

const PageContext = createContext();

export function PageProvider({ children }: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <PageContext.Provider
      value={{ page, setPage, rowsPerPage, setRowsPerPage }}
    >
      {children}
    </PageContext.Provider>
  );
}

export default PageContext;
