// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Tables
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const userManagement = () => {
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="#"> User Management </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> List </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col xl="12" lg="12" md="12" sm="12">
          <TableWithButtons />
        </Col>
      </Row>
    </Fragment>
  )
}

export default userManagement
