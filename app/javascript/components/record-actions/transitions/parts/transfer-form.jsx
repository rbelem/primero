import React, { useState } from "react";
import { useI18n } from "components/i18n";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { TextField, Box, Button } from "@material-ui/core";
import { SearchableSelect } from "components/searchable-select";
import TransferCheckbox from "./transfer-checkbox";
import BulkTransfer from "./bulk-transfer";
import mockData from "../mocked-users";
import styles from "../styles.css";

const TransferForm = ({
  providedConsent,
  isBulkTransfer,
  userPermissions,
  handleClose
}) => {
  const css = makeStyles(styles)();
  const i18n = useI18n();
  // TODO: This will change when integrate with API
  const [state, setState] = useState({
    transfer: false,
    remoteSystem: false,
    consentFromIndividual: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const canConsentOverride =
    userPermissions &&
    userPermissions.filter(permission => {
      return ["manage", "consent_override"].includes(permission);
    }).size > 0;

  const closeModal = () => {
    handleClose();
  };

  const disableControl = !providedConsent && !state.transfer;
  // TODO: Change when integrating with API
  if (state.transfer) {
    console.log("Reset Form values");
  }

  return (
    <>
      {!providedConsent ? (
        <div className={css.alertTransferModal}>
          {i18n.t("transfer.provided_consent_label")}
        </div>
      ) : null}
      {isBulkTransfer ? <BulkTransfer /> : null}
      <Box>
        {canConsentOverride && !providedConsent ? (
          <TransferCheckbox
            checked={state.transfer}
            onChange={handleChange("transfer")}
            label={i18n.t("transfer.transfer_label")}
          />
        ) : null}
        <br />
        <TransferCheckbox
          checked={state.remoteSystem}
          onChange={handleChange("remoteSystem")}
          label={i18n.t("transfer.is_remote_label")}
          disabled={disableControl}
        />
        <br />
        <TransferCheckbox
          checked={state.consentFromIndividual}
          onChange={handleChange("consentFromIndividual")}
          label={i18n.t("transfer.consent_from_individual_label")}
          disabled={disableControl}
        />
        <SearchableSelect
          id="agency"
          isDisabled={disableControl}
          options={mockData}
          onChange={data => console.log(data)}
          TextFieldProps={{
            label: i18n.t("transfer.agency_label"),
            placeholder: i18n.t("transfer.select_label"),
            InputLabelProps: {
              htmlFor: "agency",
              shrink: true
            },
            className: css.searchableSelect
          }}
        />
        <SearchableSelect
          id="location"
          isDisabled={disableControl}
          options={mockData}
          onChange={data => console.log(data)}
          TextFieldProps={{
            label: i18n.t("transfer.location_label"),
            placeholder: i18n.t("transfer.select_label"),
            InputLabelProps: {
              htmlFor: "location",
              shrink: true
            },
            className: css.searchableSelect
          }}
        />
        <SearchableSelect
          id="recipient"
          isDisabled={disableControl}
          options={mockData}
          onChange={data => console.log(data)}
          TextFieldProps={{
            label: i18n.t("transfer.recipient_label"),
            placeholder: i18n.t("transfer.select_label"),
            InputLabelProps: {
              htmlFor: "recipient",
              shrink: true
            },
            className: css.searchableSelect
          }}
        />
        <TextField
          id="standard-full-width"
          label={i18n.t("transfer.notes_label")}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          disabled={disableControl}
        />

        <Box
          display="flex"
          my={3}
          justifyContent="flex-start"
          className={css.modalAction}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={css.modalActionButton}
          >
            {i18n.t("transfer.submit_label")}
          </Button>
          <Button onClick={closeModal} color="primary" variant="outlined">
            {i18n.t("buttons.cancel")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

TransferForm.propTypes = {
  providedConsent: PropTypes.bool.isRequired,
  isBulkTransfer: PropTypes.bool.isRequired,
  userPermissions: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default TransferForm;