"use client";

import EditBtn from "../EditBtn";
import DeleteBtn from "../DeleteBtn";
import { Supplier } from "@/types/suppliers.types";
import {
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface SupplierCardProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export default function SupplierCard({
  suppliers,
  onEdit,
  onDelete,
}: SupplierCardProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {suppliers.length === 0 && (
        <div className="text-gray-400 text-center py-6 bg-linear-to-br from-gray-900 to-black rounded-lg border border-red-800 shadow-inner col-span-full">
          No suppliers found
        </div>
      )}

      {suppliers.map((sup) => (
        <div
          key={sup._id}
          className="group relative bg-linear-to-br from-[#0f0f0f] to-[#1a1a1a]
          text-gray-100 p-5 rounded-xl border border-red-900
          shadow-lg hover:shadow-red-900/40 hover:border-red-600
          transition-all duration-300"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-red-900/10 blur-xl"></div>

          {/* Supplier Info */}
          <div className="mb-3 border-b border-red-900 pb-2">
            <h3 className="text-xl font-bold text-red-400 tracking-wide">
              {sup.supplier_name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <PhoneIcon className="w-4 h-4 text-red-400" />
              {sup.contact_number}
            </div>

            {sup.email && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <EnvelopeIcon className="w-4 h-4 text-red-400" />
                {sup.email}
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-red-300 font-semibold mb-1">
              <BuildingOfficeIcon className="w-5 h-5" />
              {sup.supplier_company.name}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <PhoneIcon className="w-4 h-4 text-red-400" />
              {sup.supplier_company.contact.phone}
              {sup.supplier_company.contact.email && (
                <>
                  <span className="mx-1">•</span>
                  <EnvelopeIcon className="w-4 h-4 text-red-400" />
                  {sup.supplier_company.contact.email}
                </>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-red-300 font-semibold mb-1">
              <MapPinIcon className="w-5 h-5" />
              Address
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {sup.supplier_company.address.street},{" "}
              {sup.supplier_company.address.city},{" "}
              {sup.supplier_company.address.state} -{" "}
              {sup.supplier_company.address.zipCode},{" "}
              {sup.supplier_company.address.country}
            </p>
          </div>

          {/* Social Media (using pills) */}
          {sup.supplier_company.socialMedia && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-red-300 font-semibold mb-1">
                <GlobeAltIcon className="w-5 h-5" />
                Social
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {sup.supplier_company.socialMedia.instagram && (
                  <span className="px-2 py-1 bg-pink-600/10 text-pink-400 rounded-md border border-pink-600/30">
                    Instagram: {sup.supplier_company.socialMedia.instagram}
                  </span>
                )}
                {sup.supplier_company.socialMedia.facebook && (
                  <span className="px-2 py-1 bg-blue-600/10 text-blue-400 rounded-md border border-blue-600/30">
                    Facebook: {sup.supplier_company.socialMedia.facebook}
                  </span>
                )}
                {sup.supplier_company.socialMedia.twitter && (
                  <span className="px-2 py-1 bg-sky-600/10 text-sky-400 rounded-md border border-sky-600/30">
                    Twitter: {sup.supplier_company.socialMedia.twitter}
                  </span>
                )}
                {sup.supplier_company.socialMedia.linkedin && (
                  <span className="px-2 py-1 bg-indigo-600/10 text-indigo-400 rounded-md border border-indigo-600/30">
                    LinkedIn:{sup.supplier_company.socialMedia.linkedin}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <EditBtn onClick={() => onEdit(sup)}>Edit</EditBtn>
            <DeleteBtn onClick={() => onDelete(sup._id)}>Delete</DeleteBtn>
          </div>
        </div>
      ))}
    </div>
  );
}
