import { Component } from "../components/Component"
import { componentList } from "../assets/constants"
import { useState } from "react"

export const Home = () => {
  const [components, setComponents] = useState(componentList)

  return (
    <>
      <div className="container mx-auto">

        <h1 className="text-3xl font-semibold border text-center py-3">Prometeo1.0</h1>

        <div className="flex flex-row py-5">
          <div className="basis-1/2 px-3">
            <h3 className="pb-5 text-center font-semibold text-xl">Descripcion General</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut suscipit doloremque voluptatum laboriosam labore, minima eligendi rerum tenetur mollitia perspiciatis error deserunt ex reprehenderit ducimus, quasi aliquid corporis voluptatem neque!
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint veritatis omnis sit tempore, soluta a optio repellat. Dolores a maxime qui optio ab, distinctio, ut at neque quibusdam, corrupti itaque!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea repellendus quaerat voluptate illum officia fuga ut accusantium unde culpa saepe reiciendis omnis, corporis rem, enim explicabo quis mollitia minus aut.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio minima omnis praesentium nisi placeat esse unde aliquam ducimus. Culpa reiciendis velit doloribus libero cumque saepe necessitatibus obcaecati aspernatur quod recusandae?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod cumque nostrum aliquam obcaecati rem ipsum quis totam, consequatur itaque, sapiente ullam dignissimos nisi quae? Perspiciatis sequi alias doloribus consequuntur mollitia?
            </p>

          </div>
          <div className="basis-1/2 items-center justify-center border">
            <img src="src/assets/images/cansat.jpg" alt="" className="w-96 mx-auto"/>
          </div>
        </div>

        <div className="flex flex-col">
          {
            components.map(item => 
              <Component img={item.img} desc={item.desc} title={item.title} />
            )
          }
        </div>
      </div>
    </>
  )
} 