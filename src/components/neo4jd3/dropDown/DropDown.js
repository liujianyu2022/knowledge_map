import React from "react"
import "./dropDown.less"

export default class DropDown extends React.Component {
    state = {
        visible: true,
        showContent: [],
        currentNodeOrRealtionship: null         //保存当前右键点击的节点或者连线
    }

    render() {
        let { visible, showContent } = this.state
        let { wrapStyles} = this.props

        return visible && (
            <div ref={cur => this.dropdown = cur} className="contextMenu-wrap" style={wrapStyles} onClick={this.handle} >
                {
                    showContent.length && showContent.map((item, index) => {
                        return <div className="contextMenu-option" key={index}>{item}</div>
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener("contextMenu", this.handleContextMenu)
        window.addEventListener("click", this.cancelDropdown)              //当点击左键的时候就隐藏dropdowm
    }

    componentWillUnmount() {
        window.removeEventListener("contextMenu", this.handleContextMenu)
        window.removeEventListener("click", this.cancelDropdown)
    }

    handle = (event) => {         //采用事件委托,把点击事件交给父元素
        let action = event.target.innerText
        let {handleDropdownClick} = this.props
        let {currentNodeOrRealtionship} = this.state

        console.log(currentNodeOrRealtionship)

        handleDropdownClick(action, currentNodeOrRealtionship.id)           //调用父组件的方法，处理不同类型的dropdown项
    }

    handleContextMenu = (showContent, event) => {
        event.preventDefault()

        this.setState({ visible: true, showContent }, () => {

            // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
            let clickX = event.clientX
            let clickY = event.clientY

            // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
            const screenW = window.innerWidth
            const screenH = window.innerHeight

            // 获取自定义菜单的宽度/高度
            const rootW = this.dropdown.offsetWidth
            const rootH = this.dropdown.offsetHeight

            // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
            // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
            const right = (screenW - clickX) > rootW
            const left = !right
            const bottom = (screenH - clickY) > rootH
            const top = !bottom

            if (right) {
                this.dropdown.style.left = `${clickX}px`
            }

            if (left) {
                this.dropdown.style.left = `${clickX - rootW}px`
            }

            if (bottom) {
                this.dropdown.style.top = `${clickY}px`
            }
            if (top) {
                this.dropdown.style.top = `${clickY - rootH}px`
            }
        })
    }

    cancelDropdown = () => {
        const { visible } = this.state
        if (visible) {
            this.setState({ visible: false, currentNodeOrRealtionship:null })
        }
    }
}
