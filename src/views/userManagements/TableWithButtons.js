// ** React Imports
import {
  Fragment,
  useEffect,
  useCallback,
  useMemo,
  useState,
  forwardRef
} from 'react'

// ** Third party
import { Link } from 'react-router-dom'
import axios from 'axios'

// ** Table Data & Columns
// import { data, columns } from './data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus
} from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

const removeItem = (array, item) => {
  const newArray = array.slice()
  newArray.splice(
    newArray.findIndex((a) => a === item),
    1
  )

  return newArray
}

const DataTableWithButtons = () => {
  // ** States
  // const [currentPage, setCurrentPage] = useState(0)
  // const [searchValue, setSearchValue] = useState('')
  // const [filteredData, setFilteredData] = useState([])

  // ** Function to handle filter
  // const handleFilter = (e) => {
  //   const value = e.target.value
  //   let updatedData = []
  //   setSearchValue(value)

  //   const status = {
  //     1: { title: 'Current', color: 'light-primary' },
  //     2: { title: 'Professional', color: 'light-success' },
  //     3: { title: 'Rejected', color: 'light-danger' },
  //     4: { title: 'Resigned', color: 'light-warning' },
  //     5: { title: 'Applied', color: 'light-info' }
  //   }

  //   if (value.length) {
  //     updatedData = data.filter((item) => {
  //       const startsWith =
  //         item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.post.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.email.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.age.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
  //         status[item.status].title
  //           .toLowerCase()
  //           .startsWith(value.toLowerCase())

  //       const includes =
  //         item.full_name.toLowerCase().includes(value.toLowerCase()) ||
  //         item.post.toLowerCase().includes(value.toLowerCase()) ||
  //         item.email.toLowerCase().includes(value.toLowerCase()) ||
  //         item.age.toLowerCase().includes(value.toLowerCase()) ||
  //         item.salary.toLowerCase().includes(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().includes(value.toLowerCase()) ||
  //         status[item.status].title.toLowerCase().includes(value.toLowerCase())

  //       if (startsWith) {
  //         return startsWith
  //       } else if (!startsWith && includes) {
  //         return includes
  //       } else return null
  //     })
  //     setFilteredData(updatedData)
  //     setSearchValue(value)
  //   }
  // }

  // ** Function to handle Pagination
  // const handlePagination = (page) => {
  //   setCurrentPage(page.selected)
  // }

  // ** Custom Pagination
  // const CustomPagination = () => (
  //   <ReactPaginate
  //     previousLabel=""
  //     nextLabel=""
  //     forcePage={currentPage}
  //     onPageChange={(page) => handlePagination(page)}
  //     pageCount={
  //       searchValue.length ? filteredData.length / 7 : data.length / 7 || 1
  //     }
  //     breakLabel="..."
  //     pageRangeDisplayed={2}
  //     marginPagesDisplayed={2}
  //     activeClassName="active"
  //     pageClassName="page-item"
  //     breakClassName="page-item"
  //     breakLinkClassName="page-link"
  //     nextLinkClassName="page-link"
  //     nextClassName="page-item next"
  //     previousClassName="page-item prev"
  //     previousLinkClassName="page-link"
  //     pageLinkClassName="page-link"
  //     breakClassName="page-item"
  //     breakLinkClassName="page-link"
  //     containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
  //   />
  // )

  // Get data datatable
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  // const [deleted, setDeleted] = useState([]);

  const fetchUsers = async (page, size = perPage) => {
    setLoading(true)

    axios.defaults.withCredentials = true
    const headers = {
      'Admin-Portal-Key': '-XS142d-XtkalzMgEDKrxJJACUzQiuCY78iOyDfSEgE',
      'Api-Id': 'ohealth'
    }

    const response = await axios.get(
      'http://localhost/tirta-admin/public/api/v1/user/data', headers
    )
    setData(response.data.data)
    setTotalRows(response.data.total)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const handleDelete = useCallback(
    (row) => async () => {
      // await axios.delete(`https://reqres.in/api/users/${row.id}`)
      // const response = await axios.get(
      //   `https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
      // )
      const response = ''
      setData(removeItem(response.data.data, row))
      setTotalRows(totalRows - 1)
    },
    [currentPage, perPage, totalRows]
  )

  const columns = useMemo(
    () => [
      {
        name: 'First Name',
        selector: 'first_name',
        sortable: true
      },
      {
        name: 'Last Name',
        selector: 'last_name',
        sortable: true
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row) => <button onClick={handleDelete(row)}>Delete</button>
      }
    ],
    [handleDelete]
  )

  const handlePageChange = (page) => {
    fetchUsers(page)
    setCurrentPage(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage)
    setPerPage(newPerPage)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">User Management List</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Link to="/user-management/create">
              <Button className="ml-2" color="primary">
                <Plus size={15} />
                <span className="align-middle ml-50">Add Record</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
          >
            <Label className="mr-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              // onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          title="Users"
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          selectableRows
          // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />
        {/* <DataTable
          noHeader
          pagination
          selectableRows
          // columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          // paginationDefaultPage={currentPage + 1}
          // paginationComponent={CustomPagination}
          // data={searchValue.length ? filteredData : data}
        /> */}
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
