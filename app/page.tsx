import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER / NAV */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-8">
          <div className="font-bold text-xl tracking-tight text-indigo-600">
            Nexus OS
          </div>
          {/* NAV LINKS */}
          <nav className="hidden md:flex gap-6">
            <Link href="/market" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
              Marketplace
            </Link>
          </nav>
        </div>
        
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 self-center"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The Operating System for <span className="text-indigo-600">African Creators</span>.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop struggling with disjointed tools. Build funnels, sell digital products, 
              and accept payments (Mobile Money & Cards) in minutes. No coding required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Selling Free
              </Link>
              <Link href="/market" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1">
                Browse Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* VALUE PROPOSITION SECTION */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Monetize Without Borders</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to run a Global Business
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nexus OS isn't just a website builder. It's your automated sales team across the continent.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                     <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Universal Payments
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Accept Mobile Money, Bank Transfers, and Cards instantly. We settle the funds directly to your local account.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                     <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  The Nexus Marketplace
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Don't just sell to your audience—get discovered by ours. List your products in the Nexus Marketplace and reach thousands of new buyers.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                     <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Automated Digital Delivery
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Upload your ebook or course once. We securely email it to your customers instantly after purchase.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                     <Globe className="h-6 w-6 text-white" />
                  </div>
                  Pan-African Currency Support
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Sell seamlessly in Nigeria, South Africa, Kenya, Ghana, and beyond. We support all major currencies plus USD.
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}