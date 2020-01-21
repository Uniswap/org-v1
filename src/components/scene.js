import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'

export function Scene() {
  const node = useRef()

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint

    const engine = Engine.create({
      positionIterations: 20
    })

    var ballA = Bodies.circle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      30,
      { restitution: 0.5 }
    )
    var ballB = Bodies.circle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      30,
      { restitution: 0.5 }
    )

    World.add(engine.world, [ballA, ballB])


    Matter.use(MatterAttractors)

    var body = Bodies.circle(0, 0, 10, {
    plugin: {
        attractors: [
        function(ballA, ballB) {
            return {
            x: (ballA.position.x - ballB.position.x) * 1e-10,
            y: (ballA.position.y - ballB.position.y) * 1e-10
            }
        }
        ]
    }
    )

    World.add(engine.world, [body])

    World.add(engine.world, [
      // walls
      //   Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(0, window.innerHeight, window.innerWidth * 2, 1, {
        isStatic: true
      }),
      Bodies.rectangle(
        window.innerWidth * 2,
        window.innerWidth * 2,
        50,
        window.innerHeight,
        { isStatic: true }
      ),
      Bodies.rectangle(0, 300, 1, window.innerHeight, { isStatic: true })
    ])

    const render = Render.create({
      element: node.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
      }
    })

    engine.world.gravity.scale = 0

  engine.timing.timeScale = 1.5

    Engine.run(engine)

    Render.run(render)
  })

  return <div ref={node} />
}

export default Scene
