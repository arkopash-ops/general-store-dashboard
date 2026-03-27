"use client";

import { useEffect, useState } from "react";
import SupplierForm from "@/ui/suppliers/SupplierForm";
import SupplierCard from "@/ui/suppliers/SupplierCard";
import { Supplier } from "@/types/suppliers.types";



export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Supplier form state
  const [supplierName, setSupplierName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyStreet, setCompanyStreet] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await fetch("/api/suppliers");
      const data = await res.json();
      if (data.success) setSuppliers(data.data);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSuppliers();
    })();
  }, []);

  const resetForm = () => {
    setSupplierName("");
    setContactNumber("");
    setEmail("");
    setCompanyName("");
    setCompanyStreet("");
    setCompanyCity("");
    setCompanyState("");
    setCompanyZip("");
    setCompanyCountry("");
    setCompanyPhone("");
    setCompanyEmail("");
    setInstagram("");
    setFacebook("");
    setTwitter("");
    setLinkedin("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierName.trim()) return alert("Supplier name is required");

    const payload = {
      supplier_name: supplierName,
      contact_number: contactNumber,
      email,
      supplier_company: {
        name: companyName,
        address: {
          street: companyStreet,
          city: companyCity,
          state: companyState,
          zipCode: companyZip,
          country: companyCountry,
        },
        contact: {
          phone: companyPhone,
          email: companyEmail,
        },
        socialMedia: {
          instagram,
          facebook,
          twitter,
          linkedin,
        },
      },
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/suppliers/${editingId}` : "/api/suppliers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        fetchSuppliers();
        resetForm();
      } else alert(data.message);
    } catch (err) {
      console.error("Error submitting supplier:", err);
    }
  };

  const handleEdit = (sup: Supplier) => {
    setEditingId(sup._id);
    setSupplierName(sup.supplier_name);
    setContactNumber(sup.contact_number);
    setEmail(sup.email || "");
    setCompanyName(sup.supplier_company.name);
    setCompanyStreet(sup.supplier_company.address.street);
    setCompanyCity(sup.supplier_company.address.city);
    setCompanyState(sup.supplier_company.address.state);
    setCompanyZip(sup.supplier_company.address.zipCode);
    setCompanyCountry(sup.supplier_company.address.country);
    setCompanyPhone(sup.supplier_company.contact.phone);
    setCompanyEmail(sup.supplier_company.contact.email || "");
    setInstagram(sup.supplier_company.socialMedia?.instagram || "");
    setFacebook(sup.supplier_company.socialMedia?.facebook || "");
    setTwitter(sup.supplier_company.socialMedia?.twitter || "");
    setLinkedin(sup.supplier_company.socialMedia?.linkedin || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const res = await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Suppliers</h1>

      <SupplierForm
        supplierName={supplierName}
        contactNumber={contactNumber}
        email={email}
        companyName={companyName}
        companyStreet={companyStreet}
        companyCity={companyCity}
        companyState={companyState}
        companyZip={companyZip}
        companyCountry={companyCountry}
        companyPhone={companyPhone}
        companyEmail={companyEmail}
        instagram={instagram}
        facebook={facebook}
        twitter={twitter}
        linkedin={linkedin}
        setSupplierName={setSupplierName}
        setContactNumber={setContactNumber}
        setEmail={setEmail}
        setCompanyName={setCompanyName}
        setCompanyStreet={setCompanyStreet}
        setCompanyCity={setCompanyCity}
        setCompanyState={setCompanyState}
        setCompanyZip={setCompanyZip}
        setCompanyCountry={setCompanyCountry}
        setCompanyPhone={setCompanyPhone}
        setCompanyEmail={setCompanyEmail}
        setInstagram={setInstagram}
        setFacebook={setFacebook}
        setTwitter={setTwitter}
        setLinkedin={setLinkedin}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={!!editingId}
      />

      <h2 className="text-xl font-semibold mb-4">All Suppliers</h2>

      <SupplierCard
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
