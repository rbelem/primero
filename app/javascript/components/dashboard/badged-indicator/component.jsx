import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import makeStyles from "@material-ui/styles/makeStyles";
import { push } from "connected-react-router";

import { DashboardChip } from "../dashboard-chip";
import { useI18n } from "../../i18n";
import { getOption } from "../../record-form";
import { applyFilters } from "../../filters-builder/action-creators";
import { ROUTES, RECORD_PATH } from "../../../config";
import { FROM_DASHBOARD_PARAMS } from "../constants";

import styles from "./styles.css";

const BadgedIndicator = ({ data, lookup }) => {
  const dispatch = useDispatch();
  const css = makeStyles(styles)();
  const i18n = useI18n();

  const lookupsData = useSelector(state => getOption(state, lookup, i18n));

  const buildFilter = queryValue => {
    const value = queryValue.reduce((acum, obj) => {
      const v = obj.split("=");

      return { ...acum, [v[0]]: [v[1]] };
    }, {});

    return value;
  };

  if (!lookupsData || !data.size) {
    return null;
  }

  const dashboardChips = lookupsData.map(lk => {
    const value = data.get("stats").get(lk.id);
    const countValue = value ? value.get("count") : 0;
    const queryValue = value ? value.get("query") : [];

    const handlerClick = () => {
      dispatch(
        push({
          pathname: ROUTES.cases,
          search: FROM_DASHBOARD_PARAMS
        })
      );
      dispatch(
        applyFilters({
          namespace: RECORD_PATH.cases,
          options: buildFilter(queryValue),
          path: RECORD_PATH.cases
        })
      );
    };

    return (
      <li key={lk.id}>
        <DashboardChip
          label={`${countValue} ${lk.display_text}`}
          type={lk.id}
          handleClick={handlerClick}
        />
      </li>
    );
  });

  return (
    <>
      <ul className={css.statusList} key={data.get("name")}>
        <ul>{dashboardChips}</ul>
      </ul>
    </>
  );
};

BadgedIndicator.displayName = "BadgedIndicator";

BadgedIndicator.propTypes = {
  data: PropTypes.object.isRequired,
  lookup: PropTypes.string.isRequired
};

export default BadgedIndicator;