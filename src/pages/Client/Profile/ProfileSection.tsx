import ProfileOverview from "../components/Profile component/ProfileOverview";
import ProfileDetailsCard from "../components/Profile component/ProfileDetails";
import ProfileTimeLine from "../components/Profile component/ProfileTimeLine";
import ProfileEnrolledServices from "../components/Profile component/ProfileEnrolledServices";
import { Client } from "../../../api/Clients";
import { Service } from "../../../api/ServicesService";
import { Schedule } from "../../../api/SchedulesService";
import ProfilePayments from "../components/Profile component/ProfilePayments";

interface Props {
  client: Client;
  services: Service[];
  schedules: Schedule[];
  notifications: any[];
  payments: any[];
  interactions: any[];
  onSectionClick: (
    text:
      | "profile"
      | "notifications"
      | "services"
      | "interactions"
      | "schedules"
      | "payments"
  ) => void;
}
const ProfileSection: React.FC<Props> = ({
  client,
  notifications,
  interactions,
  payments,
  schedules,
  services,
  onSectionClick,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-5">
          <ProfileDetailsCard
            firstname={client.firstname + " "}
            lastname={client.lastname + " "}
            email={client.email + ""}
            phone={client.phone + ""}
          />
          <ProfileOverview
            enrolledServices={services.length}
            notifications={notifications.length}
            payments={payments.length}
            schedules={schedules.length}
          />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-7">
          <ProfileTimeLine
            interactions={interactions}
            onMangeInteractions={() => onSectionClick("interactions")}
          />
          <div className="row">
            <ProfileEnrolledServices
              services={services}
              onManageServices={() => onSectionClick("services")}
            />
            <ProfilePayments
              payments={payments}
              onManagePayments={() => onSectionClick("payments")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
