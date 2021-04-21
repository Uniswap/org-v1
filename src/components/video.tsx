import React, { useEffect, useRef } from 'react'
import AL from '../images/AL.mp4'
import CYL from '../images/CYL.mp4'
import IS from '../images/IS.mp4'
import MFFL from '../images/MFFL.mp4'

import TrackVisibility from 'react-on-screen'

export const VIDEO_OPTIONS = {
  AL: AL,
  CYL: CYL,
  IS: IS,
  MFFL: MFFL
}
/**
 * Trigger the specified event on the specified element.
 * @param  {Object} elem  the target element.
 * @param  {String} event the type of the event (e.g. 'click').
 */
function triggerEvent(elem, event) {
  var clickEvent = new Event(event) // Create the event.
  elem.dispatchEvent(clickEvent) // Dispatch the event.
}

function VideoInner({ isVisible, vid }: { isVisible: boolean; vid: any }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.play()
    }
    if (!isVisible && ref.current) {
      ref.current.pause()
    }
  }, [ref.current, isVisible])

  return (
    <video id="mytest1" style={{ maxWidth: '100%' }} src={vid} controls ref={ref} muted={true} autoPlay={true}></video>
  )
}

export default function Video({ option, description }: { option: string }) {
  return (
    <TrackVisibility partialVisibility offset={10}>
      {({ isVisible }) => (
        <>
          <VideoInner isVisible={isVisible} vid={VIDEO_OPTIONS[option] ?? 'AL'} />
          <p style={{ marginBottom: '2rem', fontStyle: 'italic', fontSize: '14px', opacity: 0.6 }}>
            {description ? description : ''}
          </p>
        </>
      )}
    </TrackVisibility>
  )
}
