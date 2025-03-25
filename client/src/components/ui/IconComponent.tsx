import { IconType } from 'react-icons'
import PropTypes from 'prop-types'
interface IconStar {
	icon: IconType
}
const IconComponent: React.FC<IconStar> = ({ icon: Icon }) => {
	return <Icon />
}
IconComponent.propTypes = {
	icon: PropTypes.func.isRequired,
}
export default IconComponent
