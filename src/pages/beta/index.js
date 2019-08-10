import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Link from '../../components/utils/temp-link'
import { hydrate as hydateDataManagerAction } from '../../state/reducers/data-sets'
import { normalize as normalizeDataSetAction } from '../../state/reducers/data-sets'
import {
  PRODUCT_VOLUMES_FISCAL_YEAR,
  REVENUES_MONTHLY,
  REVENUES_FISCAL_YEAR,
  BY_ID, BY_COMMODITY,
  BY_STATE, BY_COUNTY,
  BY_OFFSHORE_REGION,
  BY_LAND_CATEGORY,
  BY_LAND_CLASS,
  BY_REVENUE_TYPE,
  BY_FISCAL_YEAR,
  BY_CALENDAR_YEAR
} from '../../state/reducers/data-sets'

import * as CONSTANTS from '../../js/constants'
import utils from '../../js/utils'


import DefaultLayout from '../../components/layouts/DefaultLayout'
import { Tabordion, Tab } from '../../components/layouts/Tabordion'
import TabContainer from '../../components/layouts/Tabordion/TabContainer.js'
import RevenueTrends from '../../components/sections/RevenueTrends'
import TotalRevenue from '../../components/sections/TotalRevenue/TotalRevenueDeprecated'
import TotalDisbursements from '../../components/sections/TotalDisbursements/TotalDisbursementsDeprecated'
import TotalProduction from '../../components/sections/TotalProduction/TotalProductionDeprecated'
import DisbursementTrends from '../../components/sections/DisbursmentTrends'
import ExploreRevenue from '../../components/sections/Explore/Revenue'
import ExploreDisbursements from '../../components/sections/Explore/Disbursements'
import ExploreProduction from '../../components/sections/Explore/Production'
import { MapSection } from '../../components/sections/MapSection'

import { WhatsNew } from '../../components/sections/WhatsNew'

class Beta extends React.Component {
  constructor (props) {
    super(props)

    this.hydrateStore()
  }

  /**
   * Add the data to the redux store to enable
   * the components to access filtered data using the
   * reducers
   **/
  hydrateStore () {
    let data = this.props.data;

    this.props.normalizeDataSet([
      { key: REVENUES_MONTHLY,
        data: data.allMonthlyRevenues.data,
        groups: [
          {
            key:BY_CALENDAR_YEAR,
            groups: data.allMonthlyRevenuesByCalendarYear.group
          }
        ]
      },
      { key: REVENUES_FISCAL_YEAR,
        data: data.allFiscalYearRevenues.data,
        groups: [
          {
            key:BY_FISCAL_YEAR,
            groups: data.allFiscalYearRevenuesByFiscalYear.group
          }
        ]
      },
      {
        key: PRODUCT_VOLUMES_FISCAL_YEAR,
        data: data.allFiscalYearProductVolumes.data,
        groups: [
          {
            key:BY_FISCAL_YEAR+"_Gas",
            groups: data.allFiscalYearProductVolumesByFiscalYear_Gas.group
          },
          {
            key:BY_FISCAL_YEAR+"_Oil",
            groups: data.allFiscalYearProductVolumesByFiscalYear_Oil.group
          },
          {
            key:BY_FISCAL_YEAR+"_Coal",
            groups: data.allFiscalYearProductVolumesByFiscalYear_Coal.group
          }
        ]
      }
    ]);

    this.props.hydateDataManager([
      { key: CONSTANTS.PRODUCTION_VOLUMES_OIL_KEY, data: this.props.data.OilVolumes.volumes },
      { key: CONSTANTS.PRODUCTION_VOLUMES_GAS_KEY, data: this.props.data.GasVolumes.volumes },
      { key: CONSTANTS.PRODUCTION_VOLUMES_COAL_KEY, data: this.props.data.CoalVolumes.volumes },
      { key: CONSTANTS.REVENUES_ALL_KEY, data: this.props.data.allRevenues.revenues },
      { key: CONSTANTS.DISBURSEMENTS_ALL_KEY, data: this.props.data.Disbursements.disbursements },
    ])
  }

//const Beta = (props) => {
    render () {
	return(
	    <DefaultLayout>
	      <main>
		<Helmet
		  title="Beta | Natural Resources Revenue Data"
		  meta={[
		      // title
		      { name: 'og:title', content: 'Beta | Natural Resources Revenue Data' },
		      { name: 'twitter:title', content: 'Beta | Natural Resources Revenue Data' },
		  ]} />
		<Tabordion>
		  <Tab id="tab-revenue" name="Revenue">
		    <TabContainer id="tab-container-revenue" name="Revenue"
				  title="Revenue"
				  info="How much money do energy and mineral resources bring into federal government?"
				  contentLeft={<TotalRevenue/>}
				  contentRight={<RevenueTrends/>}
				  contentBottom={<ExploreRevenue />}
				  />
		  </Tab>
		  <Tab id="tab-disbursements" name="Disbursements" >
		    <TabContainer id="tab-container-disbursements" 
				  title="Disbursements"
				  info="Where does the money that is brought in go?"
				  contentRight={<DisbursementTrends/>}
         			  contentLeft={<TotalDisbursements/>}
				  contentBottom={<ExploreDisbursements/>}
				  
				  />
		    
		  </Tab>  
		  <Tab id="tab-production" name="Production" >
		    <TabContainer id="tab-container-production" 
			      title="Production"
				  info="What volume of enegy and mineral resources are extracted on property owned by the federal government and Native Americans?"
				  contentBottom={<ExploreProduction/>}
				  >
				  <TotalProduction />
		    </TabContainer>
		    
		    
		  </Tab>  
		  <Tab id="tab-by-state" name="Data by State" >
		    <TabContainer id="tab-container-by-state" 
				  title="Data by state"
				  >
		      
		      <MapSection 
			title="Learn about extractive industries in each state"
			info="Explore production, revenue, and disbursements data for each state."
			states={this.props.data.states_data.states}
			offshore_regions={this.props.data.offshore_data.offshore_regions}
			mapFeatures="states"
			mapTitle="Revenue"
			mapJson="/maps/land/us-topology.json"
			mapOffshoreJson="/maps/offshore/offshore.json"
			onClick={ (d,i) => { 
			    let state=fipsAbbrev[d.id] || d.id;
			    let url="/explore/"+state+"#revenue" 
			    window.location.href = url;
			    
			} }
			/>
			
		    </TabContainer>
		  </Tab>  
		</Tabordion>	
		
		
		
		<WhatsNew />
	      </main>
	    </DefaultLayout>
	)
    }
}

export default connect(
  state => ({}),
  dispatch => ({
    hydateDataManager: dataSets => dispatch(hydateDataManagerAction(dataSets)),
    normalizeDataSet: dataSets => dispatch(normalizeDataSetAction(dataSets))
  })
)(Beta)

/*
		<TabContainer id="tab-container-revenue" name="Revenue"
			      title="Revenue"
			      info="How much money do energy and mineral resources bring into federal government?"
			      tabContentRight={<RevenueTrends/>}
         		      tabContentLeft={<RevenueTrends/>}
			      />
		<TabContainer id="tab-container-disbursements" 
		  title="Disbursements"
		  info="Where does the money that is brought in go?"
		  tabContentRight={<DisbursementTrends/>}
         	  tabContentLeft={<DisbursementTrends/>}
		  
		  />
*/


export const query = graphql`
  query BetaQuery {
    offshore_data:allMarkdownRemark (filter:{fileAbsolutePath: {regex: "/offshore_regions/"}} sort:{fields: [frontmatter___title], order: ASC}) {
      offshore_regions:edges {
        offshore_region:node {
          frontmatter {
            title
            unique_id
            permalink
            is_cropped
          }
        }
      }
    }
    states_data:allMarkdownRemark (filter:{fileAbsolutePath: {regex: "/states/"}} sort:{fields: [frontmatter___title], order: ASC}) {
      states:edges {
        state:node {
          frontmatter {
            title
            unique_id
            is_cropped
          }
        }
      }
    }
    OilVolumes:allProductVolumes (
      filter:{ProductName:{eq: "Oil"}}
      sort:{fields:[ProductionDate], order: DESC}
    ) {
      volumes:edges {
        data:node {
          LandCategory
          OnshoreOffshore
          Volume
          ProductionMonth
          DisplayMonth
          ProductionYear
          DisplayYear
          ProductionDate
          Units
          LongUnits
          ProductName
          LandCategory_OnshoreOffshore
        }
      }
    }
    GasVolumes:allProductVolumes (
      filter:{ProductName:{eq: "Gas"}}
      sort:{fields:[ProductionDate], order: DESC}
    ) {
      volumes:edges {
        data:node {
          LandCategory
          OnshoreOffshore
          Volume
          ProductionMonth
          DisplayMonth
          ProductionYear
          DisplayYear
          ProductionDate
          Units
          LongUnits
          ProductName
          LandCategory_OnshoreOffshore
        }
      }
    }
    CoalVolumes:allProductVolumes (
      filter:{ProductName:{eq: "Coal"}}
      sort:{fields:[ProductionDate], order: DESC}
    ) {
      volumes:edges {
        data:node {
          LandCategory
          OnshoreOffshore
          Volume
          ProductionMonth
          DisplayMonth
          ProductionYear
          DisplayYear
          ProductionDate
          Units
          LongUnits
          ProductName
          LandCategory_OnshoreOffshore
        }
      }
    }
    allRevenues:allResourceRevenuesMonthly(
      filter:{RevenueCategory:{ne: null}}
      sort:{fields:[RevenueDate], order: DESC}
    ) {
      revenues:edges {
        data:node {
          RevenueDate
          RevenueMonth:RevenueDate(formatString: "MMMM")
          RevenueYear:RevenueDate(formatString: "YYYY")
          DisplayYear:RevenueDate(formatString: "'YY")
          DisplayMonth:RevenueDate(formatString: "MMM")
          Revenue
          RevenueCategory
        }
      }
    }
    allMonthlyRevenues: allResourceRevenuesMonthly(
      filter: {
        RevenueCategory: {ne: null}
      },
      sort: {fields: [RevenueDate], order: DESC}) {
      data: edges {
        node {
          id
          RevenueDate
          RevenueMonth: RevenueDate(formatString: "MMMM")
          RevenueYear: RevenueDate(formatString: "YYYY")
          DisplayYear: RevenueDate(formatString: "'YY")
          DisplayMonth: RevenueDate(formatString: "MMM")
          Revenue
          RevenueCategory
        }
      }
    }
    allMonthlyRevenuesByCalendarYear: allResourceRevenuesMonthly(
      filter: {RevenueCategory: {ne: null}},
      sort: {fields: [RevenueDate], order: DESC}) {
      group(field: CalendarYear) {
        id: fieldValue
        data: edges {
          node {
            id
          }
        }
      }
    }
    allFiscalYearRevenues: allResourceRevenuesFiscalYear(
      filter: {RevenueCategory: {ne: null}},
      sort: {fields: [RevenueDate], order: DESC}) {
      data: edges {
        node {
          id
          FiscalYear
          Revenue
          RevenueCategory
          Units
          LongUnits
        }
      }
    }
    allFiscalYearRevenuesByFiscalYear: allResourceRevenuesFiscalYear(
      filter: {RevenueCategory: {ne: null}},
      sort: {fields: [RevenueDate], order: DESC}) {
      group(field: FiscalYear) {
        id: fieldValue
        data: edges {
          node {
            id
          }
        }
      }
    }
    allFiscalYearProductVolumes: allProductVolumesFiscalYear (
      filter: {ProductName: {in: ["Gas","Coal","Oil"]}},
      sort: {fields: [ProductionDate], order: DESC}){
      data: edges {
        node {
          id
          FiscalYear
          LandCategory_OnshoreOffshore
          Volume
          ProductName
          Units
          LongUnits
        }
      }
    }
    allFiscalYearProductVolumesByFiscalYear_Gas: allProductVolumesFiscalYear(
      filter: {ProductName: {eq: "Gas"}},
      sort: {fields: [ProductionDate], order: DESC}) {
      group(field: FiscalYear) {
        id: fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allFiscalYearProductVolumesByFiscalYear_Oil: allProductVolumesFiscalYear(
      filter: {ProductName: {eq: "Oil"}},
      sort: {fields: [ProductionDate], order: DESC}) {
      group(field: FiscalYear) {
        id: fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    allFiscalYearProductVolumesByFiscalYear_Coal: allProductVolumesFiscalYear(
      filter: {ProductName: {eq: "Coal"}},
      sort: {fields: [ProductionDate], order: DESC}) {
      group(field: FiscalYear) {
        id: fieldValue
        data:edges {
          node {
            id
          }
        }
      }
    }
    Disbursements:allFederalDisbursements (
      sort:{fields:[Year], order: DESC}
    ){
      disbursements:edges {
        data:node {
          id
          Year
          DisplayYear
          Fund
          Source
          Disbursement
          DisbursementCategory
          internal {
            type
            contentDigest
            owner
          }
        }
      }
    }
  }
`