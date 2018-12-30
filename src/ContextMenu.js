import React from "react"
import ReactDOM from "react-dom"
import onClickOutside from "react-onclickoutside"

/**
 * Context Menu
 */
class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
    this.el = React.createRef()
  }
  state = {
    visible: this.props.visible,
    x: null,
    y: null
  }
  static defaultProps = {
    node: document.body
  }
  handleClickOutside = event => {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    if (!this.el.current.parentNode) return
    document.addEventListener("contextmenu", this.handleContextMenu)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      })
    }
  }
  handleContextMenu = event => {
    if (
      event.target === this.el.current.parentNode ||
      this.el.current.parentNode.contains(event.target)
    ) {
      event.preventDefault()
      event.stopPropagation()

      const x = event.clientX || (event.touches && event.touches[0].pageX)
      const y = event.clientY || (event.touches && event.touches[0].pageY)

      this.setState({
        visible: true,
        x,
        y
      })
    }
  }
  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleContextMenu)
  }
  render() {
    const { x, y } = this.state
    const style = {
      left: x,
      top: y,
      position: "absolute",
      zIndex: 9999,
      background: "white",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2)",
      borderRadius: 3,
      ...this.props.style
    }
    return (
      <div ref={this.el}>
        {this.state.visible &&
          ReactDOM.createPortal(
            <Wrapper handleClickOutside={this.handleClickOutside}>
              <div style={style}>{this.props.children}</div>
            </Wrapper>,
            this.props.node
          )}
      </div>
    )
  }
}

/**
 * Menu
 */
class Menu extends React.Component {
  handleClickOutside = event => this.props.handleClickOutside(event)
  render() {
    return this.props.children
  }
}

const Wrapper = onClickOutside(Menu)

export default ContextMenu
