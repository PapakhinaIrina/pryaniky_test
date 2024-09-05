import { FC, useState, ChangeEvent, useEffect } from "react";
import { Alert, Button, Dialog, DialogContent, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { URL, URL_WITH_ID } from "shared/url/base_url";
import { USER_TOKEN } from "entities/token/user_token";
import classNames from "classnames";
import styles from "./modalGrid.module.scss";
import dayjs from "dayjs";
import { TGridElement } from "shared/pages/table/types";

export type ModalGridProps = {
  open: boolean;
  onClose: () => void;
  selectedRow?: TGridElement[];
};

const initialState = {
  companySigDate: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: "",
  employeeSignatureName: "",
  companySignatureName: "",
};

export const ModalGrid: FC<ModalGridProps> = ({
  open,
  onClose,
  selectedRow,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      const item = selectedRow[0];
      setFormData({
        companySigDate: item.companySigDate || "",
        documentName: item.documentName || "",
        documentStatus: item.documentStatus || "",
        documentType: item.documentType || "",
        employeeNumber: item.employeeNumber || "",
        employeeSigDate: item.employeeSigDate || "",
        employeeSignatureName: item.employeeSignatureName || "",
        companySignatureName: item.companySignatureName || "",
      });
    }
  }, [selectedRow]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData) return;

    const getIdForEdit =
      selectedRow && selectedRow.length > 0
        ? selectedRow.at(0)?.id?.toString() || ""
        : "";

    try {
      const response = await fetch(
        selectedRow && selectedRow?.length > 0
          ? URL_WITH_ID(getIdForEdit).grid_edit
          : URL.grid_post,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth": USER_TOKEN,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        <Alert severity="error">Error</Alert>;
      }
      <Alert severity="success">
        {selectedRow && selectedRow?.length > 0
          ? "Данные успешно обновлены"
          : "Данные успешно добавлены"}
      </Alert>;
      onClose();
    } catch (error) {
      <Alert severity="error">{`error`}</Alert>;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const { value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: any, name: string) => {
    setFormData({ ...formData, [name]: date });
  };

  return (
    <div className={classNames(styles["modal_wrapper"])}>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent className={classNames(styles["modal_content"])}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="CompanySigDate"
              defaultValue={dayjs(new Date())}
              value={
                formData.companySigDate ? dayjs(formData.companySigDate) : null
              }
              onChange={(date) => handleDateChange(date, "companySigDate")}
            />
          </LocalizationProvider>

          <TextField
            variant="outlined"
            label="CompanySignatureName"
            value={formData.companySignatureName}
            onChange={(e) => handleChange(e, "companySignatureName")}
            sx={{ marginLeft: "10px" }}
          />

          <TextField
            variant="outlined"
            label="DocumentName"
            value={formData.documentName}
            onChange={(e) => handleChange(e, "documentName")}
          />

          <TextField
            variant="outlined"
            label="DocumentStatus"
            value={formData.documentStatus}
            onChange={(e) => handleChange(e, "documentStatus")}
            sx={{ marginLeft: "10px" }}
          />

          <TextField
            variant="outlined"
            label="DocumentType"
            value={formData.documentType}
            onChange={(e) => handleChange(e, "documentType")}
          />

          <TextField
            variant="outlined"
            label="EmployeeNumber"
            value={formData.employeeNumber}
            onChange={(e) => handleChange(e, "employeeNumber")}
            sx={{ marginLeft: "10px" }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="EmployeeSigDate"
              defaultValue={dayjs(new Date())}
              value={
                formData.employeeSigDate
                  ? dayjs(formData.employeeSigDate)
                  : null
              }
              onChange={(date) => handleDateChange(date, "employeeSigDate")}
            />
          </LocalizationProvider>

          <TextField
            variant="outlined"
            label="EmployeeSignatureName"
            value={formData.employeeSignatureName}
            onChange={(e) => handleChange(e, "employeeSignatureName")}
            sx={{ marginLeft: "10px" }}
          />
          <div></div>

          <div className={classNames(styles["modal_buttons"])}>
            <Button
              variant="contained"
              sx={{ marginRight: "10px", marginBottom: "0px" }}
              onClick={onClose}
            >
              Выйти
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
