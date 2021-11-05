function dom_hover(dom) {
  dom.onmouseover(()=>{
    dom.style.cursor = 'pointer'
  })
}


window.onload = function() {
  let positionButton = document.createElement('div');
  let positionButtonGo = document.createElement('div');
  const comStyle = 'position: fixed; z-index: 999999; bottom: 50px; right: 50px;width:50px;height: 50px;text-align: center;line-height: 50px; border: 1px solid #ccc; background: black;color: white;border-radius: 10px;'
  positionButton.style = comStyle;
  positionButton.innerText = '后退'
  // dom_hover(positionButton)
  positionButton.onclick = function() {
    window.history.back()
  }


  positionButtonGo.style = `${comStyle}right: 0px`
  positionButtonGo.innerText = '前进'
  // dom_hover(positionButtonGo)
  positionButtonGo.onclick = function() {
    window.history.forward()
  }

  document.body.append(positionButtonGo)
  document.body.append(positionButton);
}
