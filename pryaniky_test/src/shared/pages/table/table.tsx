import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteSharp, ControlPointSharp, ModeSharp } from "@mui/icons-material";
import { URL, URL_WITH_ID } from "../../url/base_url";
import { getGridRows } from "entities/grid/rows";
import { getGridColumns } from "entities/grid/columns";
import { USER_TOKEN } from "entities/token/user_token";
import { ModalGrid } from "features/modal/modal_grid";
import { TGridElement } from "./types";
import classNames from "classnames";
import styles from "./gridStyle.module.scss";

export const TablePage = () => {
  const [grid, setGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState<TGridElement[]>();
  const [visibleModal, setVisibleModal] = useState(false);
  const [disableCreateButton, setDisableCreateButton] = useState(false);
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const [disableEditButton, setDisableEditButton] = useState(false);

  useEffect(() => {
    try {
      const response = fetch(URL.grid_get, {
        method: "GET",
        headers: {
          "x-auth": USER_TOKEN,
          "Content-Type": "application/json",
        },
      });
      response.then((res) => res.json()).then((res) => setGrid(res?.data));
    } catch (error) {
      <Alert severity="error">{`error`}</Alert>;
    }
  }, []);

  const handleSelectedRow = useCallback(
    (x: any) => {
      setDisableCreateButton(x.length > 0 ? true : false);
      setDisableDeleteButton(x.length > 0 ? false : true);
      setDisableEditButton(x.length > 0 ? false : true);
      const filteredData = grid.filter((item: any) => x.includes(item.id));
      return setSelectedRow(filteredData);
    },
    [grid]
  );
  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  const handleDelete = async () => {
    const getIdSelectedItem = selectedRow?.at(0)?.id?.toString();
    if (!getIdSelectedItem) return;

    try {
      const response = await fetch(URL_WITH_ID(getIdSelectedItem).grid_delete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth": USER_TOKEN,
        },
      });
      if (!response.ok) {
        <Alert severity="error">response.status</Alert>;
      }
      <Alert severity="success">Данные успешно удалены</Alert>;
    } catch (error) {
      <Alert severity="error">{`error`}</Alert>;
    }
  };

  const rows = useMemo(() => getGridRows(grid), [grid]);
  const columns = useMemo(() => getGridColumns(grid), [grid]);
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <div className={classNames(styles["grid_wrapper"])}>
        <div className={classNames(styles["grid_container_header"])}>
          <Button onClick={handleOpenModal} disabled={disableCreateButton}>
            <ControlPointSharp sx={{ color: "black" }} fontSize="medium" />
          </Button>
          <Button disabled={disableEditButton} onClick={handleOpenModal}>
            <ModeSharp sx={{ color: "black" }} fontSize="medium" />
          </Button>
          <Button onClick={handleDelete} disabled={disableDeleteButton}>
            <DeleteSharp sx={{ color: "black" }} fontSize="medium" />
          </Button>
        </div>
        <div>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            pageSizeOptions={[5, 10, 20]}
            initialState={{ pagination: { paginationModel } }}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "20px",
              padding: "30px",
              backgroundColor: "#f5f5f5",
            }}
            onRowSelectionModelChange={(x) => handleSelectedRow(x)}
          />
        </div>
      </div>

      {visibleModal && (
        <div>
          <ModalGrid
            open={visibleModal}
            onClose={() => setVisibleModal(false)}
            selectedRow={selectedRow}
          />
        </div>
      )}
    </>
  );
};
