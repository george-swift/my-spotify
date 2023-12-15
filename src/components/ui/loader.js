const Visualizer = ({ animationDelay }) => (
  <div
    className="mx-0.5 my-0 h-1.5 w-2.5 animate-rhythm bg-gray-300"
    style={{
      animationPlayState: 'running',
      animationDirection: 'alternate',
      animationDelay
    }}
  />
)

export function Loader() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="relative inset-x-0 z-[2] mx-auto my-0 flex h-[50px] w-[100px] min-w-[100px] items-end justify-center overflow-hidden">
        <Visualizer animationDelay="250ms" />
        <Visualizer animationDelay="715ms" />
        <Visualizer animationDelay="475ms" />
        <Visualizer animationDelay="25ms" />
        <Visualizer animationDelay="190ms" />
      </div>
    </div>
  )
}
