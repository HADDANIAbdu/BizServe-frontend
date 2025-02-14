import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/Profile component/ProfileHeader";
import { useParams } from "react-router-dom";
import { Client, getClientById } from "../../../api/Clients";
import { Service } from "../../../api/ServicesService";
import { Schedule } from "../../../api/SchedulesService";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import ProfileNav from "../components/Profile component/ProfileNav";
import ProfileSection from "./ProfileSection";
import ServicesSection from "./ServicesSection";
import NotificationsSection from "./NotificationsSection";
import InteractionsSection from "./InteractionsSection";
import PaymentsSection from "./PaymentsSection";
import SchedulesSection from "./SchedulesSection";
import { Notification } from "../../../api/NotificationsService";

interface ClientProfile {
  client: Client;
  services: Service[] | [];
  schedules: Schedule[];
  payments: [];
  notifications: Notification[];
  interactions: [];
}
const ClientProfile: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const [showSection, setShowSection] = useState<
    | "profile"
    | "notifications"
    | "services"
    | "interactions"
    | "schedules"
    | "payments"
  >("profile");
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [client, setClient] = useState<ClientProfile>({
    client: {
      id: undefined,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      preference: "",
    },
    services: [],
    schedules: [],
    payments: [],
    notifications: [],
    interactions: [],
  });

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      try {
        const response = await getClientById(parseInt(urlId!));

        if (response.status === "error") {
          setError(response.errors);
        } else {
          const clientData: ClientProfile = response.data;
          setClient({
            client: clientData.client,
            services: clientData.services,
            schedules: clientData.schedules,
            payments: clientData.payments,
            notifications: clientData.notifications,
            interactions: clientData.interactions,
          });
          setClient(clientData);
          setShowAlert(true);
        }
      } catch (err) {
        console.log("Error fetching client data", err);
        setError("An error occurred while fetching the client.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [urlId]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSectionClick = (
    text:
      | "profile"
      | "notifications"
      | "interactions"
      | "services"
      | "schedules"
      | "payments"
  ) => {
    setShowSection(text);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading client info...</h5>
        <Spinner />;
      </>
    );
  }

  if (error) {
    <Alert
      showAlert={showAlert}
      type="danger"
      heading="Ensure that these requirements are met"
      text="Minimum 8 characters long, uppercase & symbol"
      onClose={handleCloseAlert}
    />;
  }

  return (
    <>
      <ProfileHeader
        clientId={client.client.id ?? 0}
        name={client.client.lastname + " " + client.client.firstname}
        email={client.client.email + ""}
        phone={client.client.phone + ""}
        preference={client.client.preference + ""}
      />
      <ProfileNav
        showSection={showSection}
        onSectionClick={handleSectionClick}
      />
      {showSection === "profile" && (
        <ProfileSection
          client={client.client}
          interactions={client.interactions}
          notifications={client.notifications}
          payments={client.payments}
          schedules={client.schedules}
          services={client.services}
          onSectionClick={handleSectionClick}
        />
      )}
      {showSection === "services" && <ServicesSection client={client.client} />}
      {showSection === "notifications" && (
        <NotificationsSection
          client_id={client.client.id ?? 0}
          notifications={client.notifications}
        />
      )}
      {showSection === "interactions" && (
        <InteractionsSection
          client_id={client.client.id ?? 0}
          interactions={client.interactions}
        />
      )}
      {showSection === "payments" && (
        <PaymentsSection
          client_id={client.client.id ?? 0}
          payments={client.payments}
        />
      )}
      {showSection === "schedules" && <SchedulesSection />}
    </>
  );
};

export default ClientProfile;
