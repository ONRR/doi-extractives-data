import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'

import { normalize as normalizeDataSetAction,
  DISBURSEMENTS_FISCAL_YEAR,
  REVENUES_FISCAL_YEAR,
  PRODUCT_VOLUMES_FISCAL_YEAR,
  BY_ID, BY_COMMODITY,
  BY_STATE, BY_COUNTY,
  BY_OFFSHORE_REGION,
  BY_LAND_CATEGORY,
  BY_LAND_CLASS,
  BY_REVENUE_TYPE,
  BY_FISCAL_YEAR,
  BY_REVENUE_CATEGORY,
  BY_FUND,
  BY_SOURCE,
  DATA_SET_KEYS } from '../../state/reducers/data-sets'

import * as CONSTANTS from '../../js/constants'

import utils from '../../js/utils'

import styles from './FederalRevenue.module.scss'
// eslint-disable-next-line css-modules/no-unused-class
import theme from '../../css-global/base-theme.module.scss'

import DefaultLayout from '../../components/layouts/DefaultLayout'
import { ExploreDataLink } from '../../components/layouts/icon-links/ExploreDataLink'
import { DownloadDataLink } from '../../components/layouts/icon-links/DownloadDataLink'
import DropDown from '../../components/selectors/DropDown'
import Select from '../../components/selectors/Select'
import GroupTable from '../../components/tables/GroupTable'
import GlossaryTerm from '../../components/utils/glossary-term.js'

import RevenuesTableToolbar from '../../components/filter-toolbars/revenues/RevenuesTableToolbar'
import ProductionTableToolbar from '../../components/filter-toolbars/production/ProductionTableToolbar'
import DisbursementsTableToolbar from '../../components/filter-toolbars/disbursements/DisbursementsTableToolbar'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const PAGE_TITLE = 'Federal Revenue | Natural Resources Revenue Data'

const ALL = 'All'
const ALL_IDS = 'all_ids'
const SELECT = '-Select-'
const REVENUE = 'Revenue'
const PRODUCTION = 'Production'
const DISBURSEMENTS = 'Disbursements'
const RECIPIENT = 'Recipient'
const RECIPIENTS = 'Recipients'
const STATE = 'State'
const COUNTY = 'County'
const SOURCE = 'Source'
const SOURCES = 'Sources'
const LOCATIONS = 'Locations'
const LOCATION = 'Location'
const COUNTIES = 'Counties'
const FILTERED_IDS = 'filtered_ids'
const FISCAL_YEAR = 'FiscalYear'
const FISCAL_YEARS = 'fiscal_years'
const NO_SECOND_COLUMN = 'No second column'
const ONSHORE = 'Onshore'
const OFFSHORE = 'Offshore'
const ONSHORE_OFFSHORE = 'Onshore & Offshore'
const LAND_CATEGORY = 'Land Category'
const FEDERAL_ONSHORE = 'Federal onshore'
const FEDERAL_OFFSHORE = 'Federal offshore'
const FEDERAL_ONSHORE_OFFSHORE = 'Federal (onshore and offshore)'
const NATIVE_AMERICAN = 'Native American'
const COMMODITY = 'Commodity'
const COMMODITIES = 'Commodities'
const REVENUE_TYPE = 'Revenue type'

const DATA_TYPE_OPTIONS = {
  [REVENUE]: REVENUES_FISCAL_YEAR,
  [PRODUCTION]: PRODUCT_VOLUMES_FISCAL_YEAR,
  [DISBURSEMENTS]: DISBURSEMENTS_FISCAL_YEAR,
}

const LAND_CATEGORY_OPTIONS = {
  [ALL]: [BY_REVENUE_TYPE],
  [FEDERAL_ONSHORE]: [BY_LAND_CLASS, BY_LAND_CATEGORY],
  [FEDERAL_OFFSHORE]: [BY_STATE, BY_OFFSHORE_REGION],
  [ONSHORE]: [BY_STATE, BY_OFFSHORE_REGION],
  [NATIVE_AMERICAN]: [BY_STATE, BY_OFFSHORE_REGION],
  [FEDERAL_ONSHORE_OFFSHORE]: [BY_COMMODITY],
}

const GROUP_BY_MAP_TO_DATA = {
  [REVENUE]: {
    [REVENUE_TYPE]: [BY_REVENUE_TYPE],
    [COMMODITY]: [BY_COMMODITY],
    [LAND_CATEGORY]: [BY_REVENUE_CATEGORY],
    [LOCATION]: [BY_STATE, BY_OFFSHORE_REGION],
  },
  [PRODUCTION]: {
    [REVENUE_TYPE]: [BY_REVENUE_TYPE],
    [COMMODITY]: [BY_COMMODITY],
    [LAND_CATEGORY]: [BY_REVENUE_CATEGORY],
    [LOCATION]: [BY_STATE, BY_OFFSHORE_REGION],
  },
  [DISBURSEMENTS]: {
    [RECIPIENT]: [BY_FUND],
    [SOURCE]: [BY_SOURCE],
    [LOCATION]: [BY_STATE],
  }
}
const GROUP_BY_OPTIONS = {
  [REVENUE]: filter => {
    let options = Object.keys(GROUP_BY_MAP_TO_DATA[REVENUE])
    return ({
      options: options,
      default: options[0]
    })
  },
  [PRODUCTION]: filter => {
    let options = Object.keys(GROUP_BY_MAP_TO_DATA[PRODUCTION])
    return ({
      options: options,
      default: options[0]
    })
  },
  [DISBURSEMENTS]: (filter, additionalColumn) => {
    if (additionalColumn === NO_SECOND_COLUMN) {
      return ({})
    }

    if (filter.recipient === ALL) {
      if (filter.source === ONSHORE_OFFSHORE || filter.source === OFFSHORE) {
        if (!additionalColumn || additionalColumn === SOURCE) {
          return ({
            options: [RECIPIENT, SOURCE],
            default: RECIPIENT
          })
        }
        else {
          return ({
            options: [RECIPIENT, SOURCE],
            default: SOURCE
          })
        }
      }
      else {
        return ({
          options: [RECIPIENT],
          default: RECIPIENT
        })
      }
    }
    else {
      if (additionalColumn) {
        return ({})
      }
    }

    return ({
      options: [RECIPIENT, SOURCE, LOCATION],
      default: RECIPIENT
    })
  }
}

const ADDITIONAL_COLUMN_MAP_TO_DATA = {
  [REVENUE]: {
    [REVENUE_TYPE]: [DATA_SET_KEYS.REVENUE_TYPE],
    [COMMODITY]: [DATA_SET_KEYS.COMMODITY],
    [LAND_CATEGORY]: [DATA_SET_KEYS.LAND_CATEGORY],
    [LOCATION]: [DATA_SET_KEYS.STATE],
    [NO_SECOND_COLUMN]: [],
  },
  [PRODUCTION]: {
    [REVENUE_TYPE]: [DATA_SET_KEYS.REVENUE_TYPE],
    [COMMODITY]: [DATA_SET_KEYS.COMMODITY],
    [LAND_CATEGORY]: [DATA_SET_KEYS.LAND_CATEGORY],
    [LOCATION]: [DATA_SET_KEYS.STATE],
    [NO_SECOND_COLUMN]: [],
  },
  [DISBURSEMENTS]: {
    [RECIPIENT]: [DATA_SET_KEYS.RECIPIENT],
    [SOURCE]: [DATA_SET_KEYS.SOURCE],
    [COUNTY]: [DATA_SET_KEYS.COUNTY],
    [LOCATION]: [DATA_SET_KEYS.LOCATION],
    [NO_SECOND_COLUMN]: [],
  }
}
const ADDITIONAL_COLUMN_OPTIONS = {
  [REVENUE]: (filter, groupBy) => {
    let options = Object.keys(GROUP_BY_MAP_TO_DATA[REVENUE]).concat(NO_SECOND_COLUMN)
    if (filter.revenueType !== ALL) {
      options = options.filter(option => option !== REVENUE_TYPE)
    }
    if (filter.commodities === undefined || (filter.commodities.length === 1 && filter.commodities[0] !== ALL)) {
      options = options.filter(option => option !== COMMODITY)
    }
    if (filter.landCategory !== ALL) {
      options = options.filter(option => option !== LAND_CATEGORY)
    }
    if (filter.locations === undefined || (filter.locations.length === 1 && filter.locations[0] !== ALL)) {
      options = options.filter(option => option !== LOCATION)
    }
    return ({
      options: options,
      default: options.find(option => option !== groupBy)
    })
  },
  [PRODUCTION]: (filter, groupBy) => {
    let options = Object.keys(GROUP_BY_MAP_TO_DATA[REVENUE]).concat(NO_SECOND_COLUMN)
    if (filter.revenueType !== ALL) {
      options = options.filter(option => option !== REVENUE_TYPE)
    }
    if (filter.commodities === undefined || (filter.commodities.length === 1 && filter.commodities[0] !== ALL)) {
      options = options.filter(option => option !== COMMODITY)
    }
    if (filter.landCategory !== ALL) {
      options = options.filter(option => option !== LAND_CATEGORY)
    }
    if (filter.locations === undefined || (filter.locations.length === 1 && filter.locations[0] !== ALL)) {
      options = options.filter(option => option !== LOCATION)
    }
    return ({
      options: options,
      default: options.find(option => option !== groupBy)
    })
  },
  [DISBURSEMENTS]: (filter, groupBy) => {
    if (filter.recipient === ALL) {
      if (filter.source === ONSHORE_OFFSHORE || filter.source === OFFSHORE) {
        if (groupBy === SOURCE) {
          return ({
            options: [RECIPIENT, NO_SECOND_COLUMN],
            default: RECIPIENT
          })
        }
        else {
          return ({
            options: [SOURCE, NO_SECOND_COLUMN],
            default: SOURCE
          })
        }
      }
      else {
        return ({
          options: undefined,
          default: undefined
        })
      }
    }
    else {
      if (groupBy) {
        return ({
          options: [RECIPIENT, SOURCE, LOCATION, NO_SECOND_COLUMN].filter(option => option !== groupBy)
        })
      }
    }

    return ({
      options: [SOURCE, LOCATION, NO_SECOND_COLUMN],
      default: SOURCE
    })
  }
}

const PLURAL_COLUMNS_MAP = {
  'Revenue type': 'revenue types',
  'Commodity': 'commodities',
  'Land Category': 'land categories',
  'Location': 'locations',
  'County': 'counties',
  [SOURCE]: SOURCES.toLowerCase(),
  [RECIPIENT]: RECIPIENTS.toLowerCase(),
}

const muiTheme = createMuiTheme({
  root: {
    flexGrow: 0,
  },
  palette: {
    primary: {
      light: '#dcf4fd',
      main: '#1478a6',
      dark: '#086996'
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#ccc'
    }
  },
})

class QueryData extends React.Component {
  constructor (props) {
    super(props)
    this.allGroupByColumns = Object.keys(GROUP_BY_MAP_TO_DATA).map(dataSetId => Object.keys(GROUP_BY_MAP_TO_DATA[dataSetId])).flat()
      .filter((item, i, a) => a.indexOf(item) === i)

    this.hydrateStore()
  }

	state = {
	  openGroupByDialog: false,
	  dataType: undefined,
	  loading: false,
	}

  /**
   * This object contains all the comparison functions to determine if the data has the value in the filter
   */
  hasFilterValue = {
    [RECIPIENTS]: (data, filter) => {
      if (filter === ALL) {
        return true
      }
      return (filter === data.Recipient)
    },
    [SOURCE]: (data, filter) => {
      if (filter === ALL) {
        return true
      }
      return (filter === data.Source)
    },
    [LOCATIONS]: (data, filter) => {
      if (filter === undefined) {
        return true
      }
      else if (filter.includes(ALL)) {
        return true
      }
      return (filter.includes(data.State) || filter.includes(data.OffshoreRegion))
    },
    [COUNTIES]: (data, filter) => {
      if (filter === undefined || filter.includes(ALL)) {
        return true
      }
      return (filter.includes(data.County))
    },
    [FISCAL_YEAR]: (data, filter) => {
      if (filter === undefined || filter.includes(ALL)) {
        return true
      }
      return (filter.includes(parseInt(data.FiscalYear)))
    },
    [LAND_CATEGORY]: (data, filter) => {
      if (filter === undefined || filter.includes(ALL)) {
        return true
      }
      if (filter === 'Onshore') {
        return (filter.includes(data.LandCategory))
      }
      if (filter === FEDERAL_ONSHORE_OFFSHORE) {
        return ([FEDERAL_ONSHORE, FEDERAL_OFFSHORE].includes(data.RevenueCategory))
      }
      return (filter.includes(data.RevenueCategory))
    },
    [COMMODITIES]: (data, filter) => {
      if (filter === undefined || filter.includes(ALL)) {
        return true
      }
      return (filter.includes(data.Commodity))
    },
    [REVENUE_TYPE]: (data, filter) => {
      if (filter === undefined || filter === ALL) {
        return true
      }
      return (filter === data.RevenueType)
    },
  }

  /**
   * This sets the filtered data based on the type of filter and the value of the filter
   * The filter type then determines the hasFilterValue function to use
   * It uses the state Data Type to determine the correct data set to use
   */
  setFilteredIds = (filterType, filter) => {
    let dataIds = this.props[DATA_TYPE_OPTIONS[this.state.dataType]][FILTERED_IDS] || Object.keys(this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_ID])
    if (filter) {
      this.props[DATA_TYPE_OPTIONS[this.state.dataType]][FILTERED_IDS] =
        dataIds.filter(id => this.hasFilterValue[filterType](this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_ID][id], filter))
    }
    else {
      this.props[DATA_TYPE_OPTIONS[this.state.dataType]][FILTERED_IDS] = dataIds
    }
  }

  /**
   * This helper function makes a unique array from the filered data using the specified data property
   */
  getUniqueOptionValuesFromFilteredData = (dataProps, addAllOption = true) => {
    let options = []
    dataProps.forEach(dataProp => {
      this.props[DATA_TYPE_OPTIONS[this.state.dataType]][FILTERED_IDS].forEach(id => {
        if (this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_ID][id][dataProp]) {
          options.push(this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_ID][id][dataProp])
        }
      })
    })

    options = Array.from(new Set(options))
    if (addAllOption && options.length > 1) {
      options = [ALL].concat(options)
    }

    return options
  }

  /**
   * The filter data options object contains code to filter the available options that are in the dataset.
   * As the user makes more selections the data set itself gets filtered and only available options are shown to the user.
   * Then when we submit we already have a filtered data set and only need to apply the last filtered option.
   *
   * Basically this is the filter engine for this query table.
   */
  filterDataOptions = {
    [REVENUE]: {
      [LAND_CATEGORY]: () => {
        this.props[REVENUES_FISCAL_YEAR][FILTERED_IDS] = undefined
        return [{ name: SELECT, placeholder: true }].concat(Object.keys(LAND_CATEGORY_OPTIONS))
      },
      [LOCATION]: landCategory => {
        this.setFilteredIds(LAND_CATEGORY, landCategory)

        let locationOptions = [].concat(
          this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.OFFSHORE_REGION], false).sort(),
          this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.STATE], false).sort())

        locationOptions = locationOptions.length > 1 ? [].concat([ALL], locationOptions) : locationOptions

        return locationOptions
      },
      [COUNTIES]: locations => {
        this.setFilteredIds(LOCATIONS, locations)
        return this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.COUNTY])
      },
      [COMMODITIES]: ({ locations, counties }) => {
        if (counties) {
          this.setFilteredIds(COUNTIES, counties)
        }
        else {
          this.setFilteredIds(LOCATIONS, locations)
        }

        return this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.COMMODITY])
      },
      [REVENUE_TYPE]: commodities => {
        this.setFilteredIds(COMMODITIES, commodities)
        return [{ name: SELECT, placeholder: true }].concat(this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.REVENUE_TYPE]))
      },
      [FISCAL_YEARS]: revenueType => {
        this.setFilteredIds(REVENUE_TYPE, revenueType)
        return [{ name: SELECT, placeholder: true }].concat(this.getUniqueOptionValuesFromFilteredData([FISCAL_YEAR], false))
      }
    },
    [PRODUCTION]: {
      [LAND_CATEGORY]: () => {
        this.props[REVENUES_FISCAL_YEAR][FILTERED_IDS] = undefined
        return [{ name: SELECT, placeholder: true }].concat(Object.keys(LAND_CATEGORY_OPTIONS))
      },
      [LOCATION]: landCategory => {
        this.setFilteredIds(LAND_CATEGORY, landCategory)

        let locationOptions = [].concat(
          this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.OFFSHORE_REGION], false).sort(),
          this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.STATE], false).sort())

        locationOptions = locationOptions.length > 1 ? [].concat([ALL], locationOptions) : locationOptions

        return locationOptions
      },
      [COUNTIES]: locations => {
        this.setFilteredIds(LOCATIONS, locations)
        return this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.COUNTY])
      },
      [COMMODITIES]: ({ locations, counties }) => {
        if (counties) {
          this.setFilteredIds(COUNTIES, counties)
        }
        else {
          this.setFilteredIds(LOCATIONS, locations)
        }

        return this.getUniqueOptionValuesFromFilteredData([DATA_SET_KEYS.COMMODITY])
      },
      [FISCAL_YEARS]: commodities => {
        this.setFilteredIds(COMMODITIES, commodities)
        return [{ name: SELECT, placeholder: true }].concat(this.getUniqueOptionValuesFromFilteredData([FISCAL_YEAR], false))
      }
    },
    [DISBURSEMENTS]: {
      [RECIPIENTS]: () => {
        let recipients = Object.keys(this.props[DISBURSEMENTS_FISCAL_YEAR][BY_FUND])
        this.props[DISBURSEMENTS_FISCAL_YEAR][FILTERED_IDS] = undefined
        return [{ name: SELECT, placeholder: true }].concat([ALL], recipients)
      },
      [SOURCE]: recipient => {
        this.setFilteredIds(RECIPIENTS, recipient)
        return [{ name: SELECT, placeholder: true }].concat(this.getUniqueOptionValuesFromFilteredData([SOURCE]))
      },
      [LOCATIONS]: source => {
        this.setFilteredIds(SOURCE, source)
        return this.getUniqueOptionValuesFromFilteredData([STATE])
      },
      [COUNTIES]: locations => {
        this.setFilteredIds(LOCATIONS, locations)
        return this.getUniqueOptionValuesFromFilteredData([COUNTY])
      },
      [FISCAL_YEARS]: ({ source, locations, counties }) => {
        if (counties) {
          this.setFilteredIds(COUNTIES, counties)
        }
        else if (locations) {
          this.setFilteredIds(LOCATIONS, locations)
        }
        else {
          this.setFilteredIds(SOURCE, source)
        }
        return [{ name: SELECT, placeholder: true }].concat(this.getUniqueOptionValuesFromFilteredData([FISCAL_YEAR], false))
      }
    }
  }

  // If group by column is in the additional columns remove it
  setGroupByFilter (value) {
    let additionalColumnFiltered = ADDITIONAL_COLUMN_OPTIONS[this.state.dataType](this.state[this.state.dataType].filter, value)
    additionalColumnFiltered.default = (this.state[this.state.dataType].additionalColumn === value) ? NO_SECOND_COLUMN : additionalColumnFiltered.default

	  this.setState({
      loading: false,
      [this.state.dataType]: {
        ...this.state[this.state.dataType],
        groupBy: value,
        additionalColumnOptions: additionalColumnFiltered.options || this.state[this.state.dataType].additionalColumnOptions,
        additionalColumn: additionalColumnFiltered.default || this.state[this.state.dataType].additionalColumn,
        tableColumns: this.getTableColumns({
          filter: this.state[this.state.dataType].filter,
          groupBy: value,
          additionalColumn: additionalColumnFiltered.default || this.state[this.state.dataType].additionalColumn }),
        tableData: this.getTableData({
          filter: this.state[this.state.dataType].filter,
          groupBy: value,
          additionalColumn: additionalColumnFiltered.default || this.state[this.state.dataType].additionalColumn })
      }
    })
  }

  setAdditionalColumns (value) {
    let groupByFiltered = GROUP_BY_OPTIONS[this.state.dataType](this.state[this.state.dataType].filter, value)
	  this.setState({
      [this.state.dataType]: {
        ...this.state[this.state.dataType],
        additionalColumn: value,
        groupBy: groupByFiltered.default || this.state[this.state.dataType].groupBy,
        groupByOptions: groupByFiltered.options || this.state[this.state.dataType].groupByOptions,
        tableColumns: this.getTableColumns({
          filter: this.state[this.state.dataType].filter,
          groupBy: groupByFiltered.default || this.state[this.state.dataType].groupBy,
          additionalColumn: value }),
        tableData: this.getTableData({
          filter: this.state[this.state.dataType].filter,
          groupBy: groupByFiltered.default || this.state[this.state.dataType].groupBy,
          additionalColumn: value })
      }
    })
  }

  onSubmitHandler (filter) {
    this.setFilteredIds(FISCAL_YEAR, filter.fiscalYearsSelected)
    let groupByFiltered = GROUP_BY_OPTIONS[this.state.dataType](filter)
    let additionalColumnFiltered = ADDITIONAL_COLUMN_OPTIONS[this.state.dataType](filter, groupByFiltered.default)

	  this.setState({
      [this.state.dataType]: {
        filter: filter,
        groupByOptions: groupByFiltered.options,
        groupBy: groupByFiltered.default,
        additionalColumnOptions: additionalColumnFiltered.options,
        additionalColumn: additionalColumnFiltered.default,
        tableColumns: this.getTableColumns({ filter: filter, groupBy: groupByFiltered.default, additionalColumn: additionalColumnFiltered.default }),
        tableSummaries: this.getTableSummaries({ filter: filter, groupBy: groupByFiltered.default, additionalColumn: additionalColumnFiltered.default }),
        tableData: this.getTableData({ filter: filter, groupBy: groupByFiltered.default, additionalColumn: additionalColumnFiltered.default })
      }
	  })
  }

	getTableColumns = dataTypeState => {
	  let columns = []; let columnExtensions = []; let grouping = []; let currencyColumns = []; let volumeColumns = []; let defaultSorting = []
	  let allColumns = this.allGroupByColumns.map(column => utils.formatToSlug(column))

	  if (!dataTypeState.groupBy) {
	    throw new Error('Must have a group by option selected')
	  }

	  let groupBySlug = utils.formatToSlug(dataTypeState.groupBy)
	  columns.push({
	    name: groupBySlug,
	    title: dataTypeState.groupBy,
	    plural: PLURAL_COLUMNS_MAP[dataTypeState.groupBy]
	  })

	  if (dataTypeState.additionalColumn && dataTypeState.additionalColumn !== NO_SECOND_COLUMN) {
	    grouping.push({ columnName: groupBySlug })
	    columns.push({
	      name: utils.formatToSlug(dataTypeState.additionalColumn),
	      title: dataTypeState.additionalColumn,
	      plural: PLURAL_COLUMNS_MAP[dataTypeState.additionalColumn]
	    })
	    // allColumns = [utils.formatToSlug(dataTypeState.additionalColumn)]
	  }

	  dataTypeState.filter.fiscalYearsSelected.sort().forEach(year => {
	    columns.push({ name: 'fy-' + year, title: year })
	    columnExtensions.push({ columnName: 'fy-' + year, align: 'right' })
	    defaultSorting = [{ columnName: 'fy-' + year, direction: 'desc' }]
	  })

	  // Have to add all the data provider types initially or they wont work??
	  let allYears = Object.keys(this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_FISCAL_YEAR])
	  if (this.state.dataType === PRODUCTION) {
	    allYears.forEach(year => {
	      volumeColumns.push('fy-' + year)
	    })
	  }
	  else {
	    allYears.forEach(year => {
	      currencyColumns.push('fy-' + year)
	    })
	  }

	  return {
	    columns: columns,
	    columnExtensions: columnExtensions,
	    grouping: grouping,
	    currencyColumns: currencyColumns,
	    volumeColumns: volumeColumns,
	    allColumns: allColumns,
	    defaultSorting: defaultSorting,
	  }
	}

	getTableSummaries = dataTypeState => {
	  let totalSummaryItems = []; let groupSummaryItems = []
	  let allYears = Object.keys(this.props[DATA_TYPE_OPTIONS[this.state.dataType]][BY_FISCAL_YEAR])

	  allYears.sort().forEach(year => {
	    totalSummaryItems.push({ columnName: 'fy-' + year, type: 'sum' })
	    groupSummaryItems.push({ columnName: 'fy-' + year, type: 'sum' })
	  })

	  // using type avg to attach the custom formatter function
	  this.allGroupByColumns.forEach(column => {
	    totalSummaryItems.push({ columnName: utils.formatToSlug(column), type: 'avg' })
	    groupSummaryItems.push({ columnName: utils.formatToSlug(column), type: 'avg' })
	  })

	  return {
	    totalSummaryItems: totalSummaryItems,
	    groupSummaryItems: groupSummaryItems,
	  }
	}

	getTableData = dataTypeState => {
	  const getSumValueProperty = () => {
	    switch (this.state.dataType) {
	    case REVENUE:
	      return 'Revenue'
	    case PRODUCTION:
	      return 'Volume'
	    case DISBURSEMENTS:
	      return 'Disbursement'
	    }
	  }

	  let dataSet = this.props[DATA_TYPE_OPTIONS[this.state.dataType]]
	  let filterIds = this.props[DATA_TYPE_OPTIONS[this.state.dataType]][FILTERED_IDS]

	  let allDataSetGroupBy = GROUP_BY_MAP_TO_DATA[this.state.dataType][dataTypeState.groupBy].map(groupBy => dataSet[groupBy])
	  let tableData = []
	  let expandedGroups = []

	  // Iterate over all group by data sets asociated with this filter group by
	  allDataSetGroupBy.forEach((dataSetGroupBy, indexGroupBy) => {
	    Object.keys(dataSetGroupBy).forEach(name => {
	      let sums = {}
	      let sumsByAdditionalColumns = {}
	      console.log(dataSetGroupBy)

	      let additionalColumnsRow = {}
	      filterIds.forEach(filteredDataId => {
	        if (!dataSetGroupBy[name].includes(filteredDataId)) return
	        let data = dataSet[BY_ID][filteredDataId]

	        if (!expandedGroups.includes(name)) {
	          expandedGroups.push(name)
	        }

	        let fiscalYearSlug = 'fy-' + data.FiscalYear
	        sums[fiscalYearSlug] = (sums[fiscalYearSlug]) ? sums[fiscalYearSlug] + data[getSumValueProperty()] : data[getSumValueProperty()]
	        if (dataTypeState.additionalColumn) {
	          // Get the data columns related to the column in the table. Could have multiple data source columns mapped to 1 table column

	          let dataColumns = ADDITIONAL_COLUMN_MAP_TO_DATA[this.state.dataType][dataTypeState.additionalColumn]

	          dataColumns.map(column => {
	            let newValue = data[column]

	            if (additionalColumnsRow[dataTypeState.additionalColumn] === undefined) {
	              additionalColumnsRow[dataTypeState.additionalColumn] = []
	              sumsByAdditionalColumns[dataTypeState.additionalColumn] = {}
	            }

	            if (newValue) {
	              // Add the fiscal year revenue for the additional column, only works when there is 1 additional column
	              if (sumsByAdditionalColumns[dataTypeState.additionalColumn][newValue] === undefined) {
	                sumsByAdditionalColumns[dataTypeState.additionalColumn][newValue] = {}
	              }

	              let fyRevenue = data[getSumValueProperty()] || 0

	              sumsByAdditionalColumns[dataTypeState.additionalColumn][newValue][fiscalYearSlug] =
                  (sumsByAdditionalColumns[dataTypeState.additionalColumn][newValue][fiscalYearSlug])
                    ? sumsByAdditionalColumns[dataTypeState.additionalColumn][newValue][fiscalYearSlug] + fyRevenue
                    : fyRevenue

	              if (!additionalColumnsRow[dataTypeState.additionalColumn].includes(newValue)) {
	                additionalColumnsRow[dataTypeState.additionalColumn].push(newValue)
	              }
	            }
	          })
	        }
	      })

	      // Easy way to check if we need to exclude a grouping due to filters
	      if (expandedGroups.includes(name)) {
	        if (Object.keys(sumsByAdditionalColumns).length > 0) {
	          Object.keys(sumsByAdditionalColumns).forEach(column => {
	            let columnSlug = utils.formatToSlug(column)

	            Object.keys(sumsByAdditionalColumns[column]).forEach(columnValue => {
	              // Add all fiscal years to each row
	              dataTypeState.filter.fiscalYearsSelected.forEach(year => {
	                let fiscalYearSlug = 'fy-' + year
	                sumsByAdditionalColumns[column][columnValue][fiscalYearSlug] = parseInt(sumsByAdditionalColumns[column][columnValue][fiscalYearSlug]) || 0
	              })
	              tableData.push(Object.assign({
	                [utils.formatToSlug(dataTypeState.groupBy)]: name,
	                [columnSlug]: columnValue
	              }, sumsByAdditionalColumns[column][columnValue]))
	            })
	          })
	        }
	        else {
	          dataTypeState.filter.fiscalYearsSelected.forEach(year => {
	            let fiscalYearSlug = 'fy-' + year
	            sums[fiscalYearSlug] = parseInt(sums[fiscalYearSlug]) || 0
	          })

	          tableData.push(Object.assign({ [utils.formatToSlug(dataTypeState.groupBy)]: name }, sums))
	        }
	      }
	    })
	  })

	  return { filteredData: tableData, expandedGroups: expandedGroups }
	}

  /**
   * Add the data to the redux store to enable
   * the components to access filtered data using the
   * reducers
   **/
  hydrateStore = () => {
    let data = this.props.data
    this.props.normalizeDataSet([
      { key: REVENUES_FISCAL_YEAR,
        data: data.allRevenues.data,
        groups: [
          {
            key: BY_COMMODITY,
            groups: data.allRevenuesGroupByCommodity.group,
          },
          {
            key: BY_STATE,
            groups: data.allRevenuesGroupByState.group,
          },
          {
            key: BY_OFFSHORE_REGION,
            groups: data.allRevenuesGroupByOffshoreRegion.group,
          },
          {
            key: BY_COUNTY,
            groups: data.allRevenuesGroupByCounty.group,
          },
          {
            key: BY_REVENUE_CATEGORY,
            groups: data.allRevenuesGroupByRevenueCategory.group,
          },
          {
            key: BY_REVENUE_TYPE,
            groups: data.allRevenuesGroupByRevenueType.group,
          },
          {
            key: BY_FISCAL_YEAR,
            groups: data.allRevenuesGroupByFiscalYear.group
          }
        ]
      },
      { key: PRODUCT_VOLUMES_FISCAL_YEAR,
        data: data.allProduction.data,
        groups: [
          {
            key: BY_COMMODITY,
            groups: data.allProductionGroupByCommodity.group,
          },
          {
            key: BY_STATE,
            groups: data.allProductionGroupByState.group,
          },
          {
            key: BY_OFFSHORE_REGION,
            groups: data.allProductionGroupByOffshoreRegion.group,
          },
          {
            key: BY_COUNTY,
            groups: data.allProductionGroupByCounty.group,
          },
          {
            key: BY_REVENUE_CATEGORY,
            groups: data.allProductionGroupByRevenueCategory.group,
          },
          {
            key: BY_FISCAL_YEAR,
            groups: data.allProductionGroupByFiscalYear.group
          }
        ]
      },
      { key: DISBURSEMENTS_FISCAL_YEAR,
        data: data.allDisbursements.data,
        groups: [
          {
            key: BY_FUND,
            groups: data.allDisbursementsGroupByFund.group,
          },
          {
            key: BY_SOURCE,
            groups: data.allDisbursementsGroupBySource.group,
          },
          {
            key: BY_STATE,
            groups: data.allDisbursementsGroupByState.group,
          },
          {
            key: BY_COUNTY,
            groups: data.allDisbursementsGroupByCounty.group,
          },
          {
            key: BY_FISCAL_YEAR,
            groups: data.allDisbursementsGroupByFiscalYear.group,
          },
        ]
      },
    ])
  }

  getFilterToolbar () {
    let dataType = this.state.dataType
	  switch (dataType) {
	  case REVENUE:
	    return (<RevenuesTableToolbar
        landCategoryOptions={this.filterDataOptions[dataType][LAND_CATEGORY]}
        locationOptions={this.filterDataOptions[dataType][LOCATION]}
	      countyOptions={this.filterDataOptions[dataType][COUNTIES]}
	      commodityOptions={this.filterDataOptions[dataType][COMMODITIES]}
	      revenueTypeOptions={this.filterDataOptions[dataType][REVENUE_TYPE]}
	      fiscalYearOptions={this.filterDataOptions[dataType][FISCAL_YEARS]}
	      onSubmit={this.onSubmitHandler.bind(this)}
      />)
    case PRODUCTION:
      return (<ProductionTableToolbar
        landCategoryOptions={this.filterDataOptions[dataType][LAND_CATEGORY]}
        locationOptions={this.filterDataOptions[dataType][LOCATION]}
        countyOptions={this.filterDataOptions[dataType][COUNTIES]}
        commodityOptions={this.filterDataOptions[dataType][COMMODITIES]}
        revenueTypeOptions={this.filterDataOptions[dataType][REVENUE_TYPE]}
        fiscalYearOptions={this.filterDataOptions[dataType][FISCAL_YEARS]}
        onSubmit={this.onSubmitHandler.bind(this)}
      />)
	  case DISBURSEMENTS:
	    return (<DisbursementsTableToolbar
	      recipientOptions={this.filterDataOptions[dataType][RECIPIENTS]}
	      sourceOptions={this.filterDataOptions[dataType][SOURCE]}
	      locationOptions={this.filterDataOptions[dataType][LOCATIONS]}
	      countyOptions={this.filterDataOptions[dataType][COUNTIES]}
	      fiscalYearOptions={this.filterDataOptions[dataType][FISCAL_YEARS]}
	      onSubmit={this.onSubmitHandler.bind(this)}
	    />)
	  }
  }

  render () {
    let tableColumns = this.state[this.state.dataType] && this.state[this.state.dataType].tableColumns
    let tableSummaries = this.state[this.state.dataType] && this.state[this.state.dataType].tableSummaries
    let tableData = this.state[this.state.dataType] && this.state[this.state.dataType].tableData
    let groupBy = this.state[this.state.dataType] && this.state[this.state.dataType].groupBy
    let groupByOptions = this.state[this.state.dataType] && this.state[this.state.dataType].groupByOptions
    let additionalColumn = this.state[this.state.dataType] && this.state[this.state.dataType].additionalColumn
    let additionalColumnOptions = this.state[this.state.dataType] && this.state[this.state.dataType].additionalColumnOptions

    if (this.state[this.state.dataType] && additionalColumnOptions) {
      additionalColumnOptions = additionalColumnOptions.filter(option => option !== this.state[this.state.dataType].groupBy)
    }
    console.log(this.state)
    return (
      <DefaultLayout>
	      <Helmet
	        title={PAGE_TITLE}
	        meta={[
	          // title
	          { name: 'og:title', content: PAGE_TITLE },
	          { name: 'twitter:title', content: PAGE_TITLE },
	        ]} />
	      <section className='layout-content container-page-wrapper container-margin'>

          <h1>Data query tool</h1>
          <div className={styles.tableToolbarContainer}>
            <MuiThemeProvider theme={muiTheme}>
              <Grid container spacing={1}>
                <Grid item sm={2} xs={12}>
                  <h6>Data type:</h6>
                </Grid>
                <Grid item sm={5} xs={12}>
                  <DropDown
                    options={[{ name: '-Select-', placeholder: true }].concat(Object.keys(DATA_TYPE_OPTIONS))}
                    sortType={'none'}
                    action={value => this.setState({ dataType: value })}
                  />
                </Grid>
                <Grid item sm={5}>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>

          {this.state.dataType && this.getFilterToolbar()}

          {tableData &&
						<div className={styles.tableContainer}>
						  <div className={styles.downloadLinkContainer}>
						    <ExploreDataLink to={'/how-it-works/#resources_process'}>How it works</ExploreDataLink>
						    <DownloadDataLink to={'/downloads/federal-revenue-by-location/'}>Documentation</DownloadDataLink>
						  </div>
						  <h2 className={theme.sectionHeaderUnderline}>{this.state.dataType}</h2>
						  <MuiThemeProvider theme={muiTheme}>
						    <Grid container spacing={1}>
						      <Grid item sm={12} xs={12}>
						        {groupBy &&
                      <div className={styles.editGroupingButton}>
                        Grouped by {groupBy}
                        {(additionalColumn) &&
                          <React.Fragment>
                            {' '}and {additionalColumn}
                          </React.Fragment>
                        }
                        .
                      </div>
						        }
						        {(groupByOptions && (additionalColumnOptions && additionalColumnOptions.length > 1)) &&
                      <div className={styles.editGroupingButton}>
                        <Button
                          variant="contained" color="primary"
                          onClick={() => this.setState({ openGroupByDialog: !this.state.openGroupByDialog })}>
                            Edit grouping
                        </Button>
                      </div>
						        }
						        <Dialog
						          disableBackdropClick={false}
						          disableEscapeKeyDown={false}
						          open={this.state.openGroupByDialog}
						          onClose={() => this.setState({ openGroupByDialog: false })}
						        >
						          <DialogContent>
						            <MuiThemeProvider theme={muiTheme}>
						              <Grid container spacing={1}>
						                <Grid item sm={6} xs={12}>
                              Group by:
						                  <DropDown
						                    options={[{ name: '-Select-', placeholder: true }].concat(groupByOptions)}
						                    sortType={'none'}
						                    selectedOptionValue={groupBy}
						                    action={value => this.setGroupByFilter(value)}
						                  />
						                </Grid>
						                <Grid item sm={6} xs={12}>
                              Breakout by:
						                  <DropDown
						                    options={[{ name: '-Select-', placeholder: true }].concat(additionalColumnOptions)}
						                    sortType={'none'}
						                    selectedOptionValue={(!additionalColumn && (additionalColumnOptions && additionalColumnOptions.includes(NO_SECOND_COLUMN)))
						                      ? NO_SECOND_COLUMN
						                      : additionalColumn
						                    }
						                    action={value => this.setAdditionalColumns(value)}
						                  />
						                </Grid>
						              </Grid>
						            </MuiThemeProvider>
						            <DialogActions>
						              <Button
						                classes={{ root: styles.tableToolbarButton }}
						                variant="contained" color="primary"
						                onClick={() => this.setState({ openGroupByDialog: false })}
						                color="primary">
                            Close
						              </Button>
						            </DialogActions>
						          </DialogContent>
						        </Dialog>
						      </Grid>
						      <Grid item sm={3} xs={12}>
						      </Grid>
						      <Grid item sm={4} xs={12}>

						      </Grid>
						    </Grid>
						  </MuiThemeProvider>
						  <GroupTable
						    rows={tableData.filteredData}
						    columns={tableColumns.columns}
						    defaultSorting={tableColumns.defaultSorting}
						    tableColumnExtension={tableColumns.columnExtensions}
						    grouping={tableColumns.grouping}
						    currencyColumns={tableColumns.currencyColumns}
						    volumeColumns={tableColumns.volumeColumns}
						    allColumns={tableColumns.allColumns}
						    expandedGroups={tableData.expandedGroups}
						    totalSummaryItems={tableSummaries.totalSummaryItems}
						    groupSummaryItems={tableSummaries.groupSummaryItems}
						  />
						</div>
          }

        </section>
      </DefaultLayout>
    )
  }
}

export default connect(
  state => ({
    [REVENUES_FISCAL_YEAR]: state[CONSTANTS.DATA_SETS_STATE_KEY][REVENUES_FISCAL_YEAR],
    [PRODUCT_VOLUMES_FISCAL_YEAR]: state[CONSTANTS.DATA_SETS_STATE_KEY][PRODUCT_VOLUMES_FISCAL_YEAR],
    [DISBURSEMENTS_FISCAL_YEAR]: state[CONSTANTS.DATA_SETS_STATE_KEY][DISBURSEMENTS_FISCAL_YEAR],
  }),
  dispatch => ({ normalizeDataSet: dataSets => dispatch(normalizeDataSetAction(dataSets)),
  })
)(QueryData)

export const query = graphql`
  query QueryDataPageQuery {
    allDisbursements:allFederalDisbursements {
      data:edges {
        node {
          County
          Disbursement
          FiscalYear
          Recipient:Fund
          Source
          State:USState
          id
        }
      }
    }
    allDisbursementsGroupByFund:allFederalDisbursements (
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      Fund: {nin: [null,""]},
      },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
      group(field: Fund) {
        id:fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allDisbursementsGroupBySource:allFederalDisbursements (
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      Source: {nin: [null,""]},
      },
	  	sort: {fields: [FiscalYear], order: DESC}) {
      group(field: Source) {
        id:fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allDisbursementsGroupByState:allFederalDisbursements (
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      USState: {nin: [null,""]},
	    },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
      group(field: USState) {
        id:fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allDisbursementsGroupByCounty:allFederalDisbursements (
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      County: {nin: [null,""]},
      },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
      group(field: County) {
        id:fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allDisbursementsGroupByFiscalYear:allFederalDisbursements (
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      County: {nin: [null,""]},
      },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
      group(field: FiscalYear) {
        id:fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allProduction:allProductVolumesFiscalYear (filter:{FiscalYear:{ne:null}}, sort: {fields: [FiscalYear], order: DESC}) {
      data:edges {
        node {
          id
          Volume
          FiscalYear
          Commodity:ProductName
          LandClass:LandCategory
          LandCategory:OnshoreOffshore
          RevenueCategory:LandCategory_OnshoreOffshore
          OffshoreRegion
          ProductionDate
          County
          State
        }
      }
    }
	  allProductionGroupByCommodity: allProductVolumesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null},
	  		ProductName: {nin: [null,""]},
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: ProductName) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allProductionGroupByState: allProductVolumesFiscalYear(
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      State: {nin: [null,""]},
	    },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: State) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allProductionGroupByOffshoreRegion: allProductVolumesFiscalYear(
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      OffshoreRegion: {nin: [null,""]},
	    }, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: OffshoreRegion) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allProductionGroupByCounty: allProductVolumesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}, 
	      County: {nin: [null,""]},
	    }, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: County) {
	      id:fieldValue
	      data:edges {
	        node {
            id
            State
	        }
	      }
	    }
	  }
	  allProductionGroupByRevenueCategory: allProductVolumesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}, 
	      LandCategory_OnshoreOffshore: {nin: [null,""]},
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: LandCategory_OnshoreOffshore) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allProductionGroupByFiscalYear: allProductVolumesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: FiscalYear) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
		allRevenues:allResourceRevenuesFiscalYear (filter:{FiscalYear:{ne:null}}, sort: {fields: [FiscalYear], order: DESC}) {
		  data:edges {
		    node {
		    	id
		      Revenue
		      RevenueType
		      FiscalYear
		      Commodity
		      LandCategory
		      LandClass
		      County
		      State
		      RevenueDate
		      OffshoreRegion
		      RevenueCategory
		    }
		  }
		}
	  allRevenuesGroupByCommodity: allResourceRevenuesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null},
	  		Commodity: {nin: [null,""]},
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: Commodity) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allRevenuesGroupByState: allResourceRevenuesFiscalYear(
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      State: {nin: [null,""]},
	    },  
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: State) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allRevenuesGroupByOffshoreRegion: allResourceRevenuesFiscalYear(
	  	filter: {
		  	FiscalYear: {ne: null}, 
	      OffshoreRegion: {nin: [null,""]},
	    }, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: OffshoreRegion) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allRevenuesGroupByCounty: allResourceRevenuesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}, 
	      County: {nin: [null,""]},
	    }, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: County) {
	      id:fieldValue
	      data:edges {
	        node {
            id
            State
	        }
	      }
	    }
	  }
	  allRevenuesGroupByRevenueCategory: allResourceRevenuesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}, 
	      RevenueCategory: {nin: [null,""]},
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: RevenueCategory) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allRevenuesGroupByRevenueType: allResourceRevenuesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}, 
	      RevenueType: {nin: [null,""]},
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: RevenueType) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
	  allRevenuesGroupByFiscalYear: allResourceRevenuesFiscalYear(
	  	filter: {
	  		FiscalYear: {ne: null}
	  	}, 
	  	sort: {fields: [FiscalYear], order: DESC}) {
	    group(field: FiscalYear) {
	      id:fieldValue
	      data:edges {
	        node {
	          id
	        }
	      }
	    }
	  }
  }
`
