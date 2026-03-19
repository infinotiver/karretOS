export default function WindowsApp() {
  return (
    <div className="min-h-screen bg-[#3973aa] text-[#fefeff] font-sans flex items-center justify-center p-4">
      <div className="max-w-200 w-full md:w-[80%] -mt-2">
        {/* Emoticon */}
        <h1 className="text-[8rem] md:text-[10rem] font-light leading-none mb-4">
          :(
        </h1>

        {/* Main Message */}
        <h2 className="text-2xl md:text-3xl font-light mb-8 leading-tight">
          Your PC ran into a problem and needs to restart. We're just collecting
          some error info, and then we'll restart for you.
        </h2>

        {/* Progress */}
        <h2 className="text-2xl md:text-3xl font-light mb-10">
          <span id="percentage">0</span>% complete
        </h2>

        {/* Footer Details */}
        <div className="flex flex-row gap-4 pt-2 items-start">
          {/* QR Code Wrapper */}
          <div className="bg-white p-1 shrink-0">
            <img
              src="http://xontab.com/experiments/Javascript/BSOD/qr.png"
              alt="QR Code"
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </div>

          {/* Stop Code Info */}
          <div className="flex-1">
            <h4 className="text-base md:text-lg font-light leading-relaxed mb-4">
              For more information about this issue and possible fixes, visit
              <br />
              <span className="underline cursor-pointer">
                http://xontab.com/stopcode
              </span>
            </h4>
            <h5 className="text-sm md:text-base font-light leading-snug">
              If you call a support person, give them this info:
              <br />
              Stop Code: 404 PAGE NOT FOUND
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
