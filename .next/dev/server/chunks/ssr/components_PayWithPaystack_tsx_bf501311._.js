module.exports = [
"[project]/components/PayWithPaystack.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PayWithPaystack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$paystack$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-paystack/dist/index.es.js [app-ssr] (ecmascript)");
'use client';
;
;
function PayWithPaystack({ amount, email, planId, onSuccess }) {
    const publicKey = ("TURBOPACK compile-time value", "pk_live_f4b6caa5badf46e992b3a307e9b49aa3316cb9fc");
    const config = {
        reference: new Date().getTime().toString(),
        email,
        amount: amount * 100,
        publicKey: publicKey || '',
        metadata: {
            funnelId: planId,
            custom_fields: []
        }
    };
    const initializePayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$paystack$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePaystackPayment"])(config);
    const handleBuy = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        initializePayment({
            onSuccess: (reference)=>{
                console.log("Payment Complete:", reference);
                if (onSuccess) onSuccess();
            },
            onClose: ()=>{
                console.log("Payment cancelled");
            }
        });
    };
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleBuy,
            className: "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
            children: "Buy Now (Secure)"
        }, void 0, false, {
            fileName: "[project]/components/PayWithPaystack.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PayWithPaystack.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_PayWithPaystack_tsx_bf501311._.js.map