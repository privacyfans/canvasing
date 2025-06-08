import UserProspectList from '@src/views/prospect/UserProspectList'
import BreadCrumb from '@src/components/Common/breadCrumb'

const ProspectListPage = () => {
  return (
    <>
      <BreadCrumb title="Prospect List" subTitle="Prospect" />
      <div className="container-fluid">
        <UserProspectList />
      </div>
    </>
  )
}

export default ProspectListPage