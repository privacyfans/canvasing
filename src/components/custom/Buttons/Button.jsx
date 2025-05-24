import PropTypes from 'prop-types'

const Button = ({
  text,
  color,
  className = '',
  custom = '',
  size = '',
  icon: Icon = null,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={` ${color} ${custom} ${className} ${size} ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...rest}>
      {Icon && <Icon className="size-4" />}
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  custom: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
}

export default Button
