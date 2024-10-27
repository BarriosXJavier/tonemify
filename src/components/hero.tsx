export default function Hero() {
  return (
    <div className="relative">
      <div className="px-4 sm:px-10">
        <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
          <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
            Stop tweaking, Start shipping
          </h1>
          <p className="text-3xl text-gray-700 dark:text-gray-300">
            Tonemify is a free and fully customizable shadcn theme builder.
          </p>
        </div>
        <hr className="my-12 border-gray-300 dark:border-gray-700" />
      </div>
      <img
        src="https://readymadeui.com/bg-effect.svg"
        className="absolute inset-0 w-full h-full"
        alt="background-effect"
      />
    </div>
  );
}
