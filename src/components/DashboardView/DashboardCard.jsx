import PropTypes from "prop-types"

const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${bgColor} flex items-center gap-4` }>
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    bgColor: PropTypes.string.isRequired
}

export default DashboardCard