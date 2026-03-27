"use client";

import { Country, State } from "country-state-city";
import CreateBtn from "../CreateBtn";
import LocationSelect from "../LocationSelect";

interface SupplierFormProps {
  supplierName: string;
  contactNumber: string;
  email: string;
  companyName: string;
  companyStreet: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  companyCountry: string;
  companyPhone: string;
  companyEmail: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  setSupplierName: (val: string) => void;
  setContactNumber: (val: string) => void;
  setEmail: (val: string) => void;
  setCompanyName: (val: string) => void;
  setCompanyStreet: (val: string) => void;
  setCompanyCity: (val: string) => void;
  setCompanyState: (val: string) => void;
  setCompanyZip: (val: string) => void;
  setCompanyCountry: (val: string) => void;
  setCompanyPhone: (val: string) => void;
  setCompanyEmail: (val: string) => void;
  setInstagram?: (val: string) => void;
  setFacebook?: (val: string) => void;
  setTwitter?: (val: string) => void;
  setLinkedin?: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function SupplierForm({
  supplierName,
  contactNumber,
  email,
  companyName,
  companyStreet,
  companyCity,
  companyState,
  companyZip,
  companyCountry,
  companyPhone,
  companyEmail,
  instagram,
  facebook,
  twitter,
  linkedin,
  setSupplierName,
  setContactNumber,
  setEmail,
  setCompanyName,
  setCompanyStreet,
  setCompanyCity,
  setCompanyState,
  setCompanyZip,
  setCompanyCountry,
  setCompanyPhone,
  setCompanyEmail,
  setInstagram,
  setFacebook,
  setTwitter,
  setLinkedin,
  onSubmit,
  onCancel,
  isEditing = false,
}: SupplierFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 bg-gray-900 p-6 rounded-md shadow-md"
    >
      {/* Supplier Info */}
      <h2 className="text-lg font-semibold mb-2">Supplier Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Company Info */}
      <h2 className="text-lg font-semibold mb-2">Company Info</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Company Address */}
      <label className="block mb-1 font-medium">Address</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Street */}
        <div>
          <label className="block mb-1 font-medium">Street</label>
          <input
            type="text"
            value={companyStreet}
            onChange={(e) => setCompanyStreet(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block mb-1 font-medium">ZIP Code</label>
          <input
            type="text"
            value={companyZip}
            onChange={(e) => setCompanyZip(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Country, State, City */}
      <div className="mb-4">
        <LocationSelect
          selectedCountry={
            companyCountry
              ? {
                  label:
                    Country.getAllCountries().find(
                      (c) => c.isoCode === companyCountry,
                    )?.name || companyCountry,
                  value: companyCountry, // ISO code
                }
              : null
          }
          selectedState={
            companyState
              ? {
                  label:
                    State.getStatesOfCountry(companyCountry).find(
                      (s) => s.isoCode === companyState,
                    )?.name || companyState,
                  value: companyState,
                }
              : null
          }
          selectedCity={
            companyCity ? { label: companyCity, value: companyCity } : null
          }
          setSelectedCountry={(option) =>
            setCompanyCountry(option ? option.value : "")
          }
          setSelectedState={(option) =>
            setCompanyState(option ? option.value : "")
          }
          setSelectedCity={(option) =>
            setCompanyCity(option ? option.value : "")
          }
        />
      </div>

      {/* Company Contact */}
      <label className="block mb-1 font-medium">Contact</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Social Media */}
      <h2 className="text-lg font-semibold mb-2">Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Instagram</label>
          <input
            type="text"
            value={instagram || ""}
            onChange={(e) => setInstagram && setInstagram(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Facebook</label>
          <input
            type="text"
            value={facebook || ""}
            onChange={(e) => setFacebook && setFacebook(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Twitter</label>
          <input
            type="text"
            value={twitter || ""}
            onChange={(e) => setTwitter && setTwitter(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">LinkedIn</label>
          <input
            type="text"
            value={linkedin || ""}
            onChange={(e) => setLinkedin && setLinkedin(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CreateBtn type="submit">{isEditing ? "Update" : "Create"}</CreateBtn>
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
