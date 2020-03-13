import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const getMarqueeNode = content => {
  const el = document.createElement('div')
  el.setAttribute('data-marquee-style', true)
  el.textContent = content
  return el
}

class Marquee {
  constructor(el) {
    this.el = el
    this.content = el.getAttribute('data-marquee')
    this.render()
  }

  render() {
    // create the shadow element to measure and calculate
    // the amount of animated items required for marquee

    // create
    const shadow = getMarqueeNode(this.content)
    shadow.setAttribute('data-marquee-shadow', true)
    // add shadow element to sanitized DOM
    this.el.innerHTML = ''
    this.el.appendChild(shadow)
    // calculate how many visible items are needed
    const inView = this.calculateItemsInView(shadow)
    // create container to house animated visible items
    const overflow = document.createElement('div')
    overflow.setAttribute('data-marquee-overflow', true)
    const content = document.createElement('div')
    content.setAttribute('data-marquee-container', true)
    // put the content container into an overflow: hidden wrapper
    overflow.appendChild(content)
    // double the amount to fill the screen to animate loop
    const count = inView * 3
    // populate with children
    for (var i = 0; i < count; i++) {
      content.appendChild(getMarqueeNode(this.content))
    }
    // add to DOM
    this.el.appendChild(overflow)

    // debug
    // console.log("visible items required", inView);
    // console.log("total items required", count);
  }

  calculateItemsInView(ref) {
    const [single, total] = [ref.clientWidth, ref.parentNode.clientWidth]
    // ceil in order to ensure there's never a shortage
    return Math.floor(total / single) + 1
  }
}

// find elements and create Marquee instances
const nodes = document.querySelectorAll('[data-marquee]')
const arr = Array.from(nodes)
const refs = (arr || []).map(node => new Marquee(node))
// recalculate on resize
window.addEventListener('resize', () => refs.map(r => r.render()))
