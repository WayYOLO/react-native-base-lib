using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Base.Lib.RNBaseLib
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNBaseLibModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNBaseLibModule"/>.
        /// </summary>
        internal RNBaseLibModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNBaseLib";
            }
        }
    }
}
