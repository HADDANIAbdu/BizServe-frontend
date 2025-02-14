import React, { useEffect, useState } from "react";
import { deleteInteraction, Interaction } from "../../../api/Interactions";
import { formatDistanceToNow } from "date-fns";
import AddInteractionForm from "../components/Interaction section component copy/AddInteraction";
import EditInteractionForm from "../components/Interaction section component copy/EditInteraction";

interface Props {
  client_id: number;
  interactions: Interaction[];
}

const InteractionsSection: React.FC<Props> = ({
  client_id,
  interactions: initialInteractions,
}) => {
  const [interactions, setInteractions] =
    useState<Interaction[]>(initialInteractions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [interactionToEdit, setInteractionToEdit] =
    useState<Interaction | null>(null); // State for the interaction to edit

  useEffect(() => {
    setInteractions(initialInteractions); // Update interactions when initialInteractions changes
  }, [initialInteractions]);

  const handleInteractionDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    await deleteInteraction(id);
    setInteractions((prev) =>
      prev.filter((interaction) => interaction.id !== id)
    );
  };

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleEditFormToggle = (interaction?: Interaction) => {
    setInteractionToEdit(interaction || null);
    setShowEditForm((prev) => !prev);
  };

  return (
    <div className="card p-3">
      <div className="row">
        <ul className="px-5 show list-unstyled">
          <li className="dropdown-menu-header border-bottom">
            <div className="dropdown-header d-flex align-items-center py-3">
              <h6 className="m-0 me-auto">Interactions</h6>
              <div className="d-flex align-items-center h6 mb-0">
                <button
                  className="btn btn bg-primary text-white"
                  onClick={handleToggleAddForm}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
          <li className="dropdown-notifications-list scrollable-container ps ps--active-y">
            <ul className="list-group list-group-flush">
              {interactions.map((interaction) => (
                <li
                  key={interaction.id}
                  className="list-group-item list-group-item-action dropdown-notifications-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditFormToggle(interaction)} // Pass interaction to the edit form
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3 d-flex align-items-center">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-info">
                          {interaction.service?.name &&
                          interaction.service?.name.length > 3
                            ? `${interaction.service.name[0].toUpperCase()} ..`
                            : interaction.service?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">
                        {interaction.service?.name}
                      </h6>
                      <small className="text-muted mb-1 d-block text-body">
                        {interaction.type}
                      </small>
                      <span className={`badge bg-label-info me-2`}>
                        {interaction.outcome}
                      </span>
                      <small className="text-muted">
                        {interaction.date_interaction &&
                          formatDistanceToNow(
                            new Date(interaction.date_interaction),
                            {
                              addSuffix: true,
                            }
                          )}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn-close text-primary"
                        aria-label="Close"
                        onClick={(e) => {
                          interaction.id &&
                            handleInteractionDelete(e, interaction.id);
                        }}
                      ></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {showAddForm && (
        <AddInteractionForm
          client_id={client_id}
          interactions={interactions}
          onClose={handleToggleAddForm}
        />
      )}
      {showEditForm &&
        interactionToEdit && ( // Ensure interactionToEdit is not null
          <EditInteractionForm
            client_id={client_id} // Pass client_id if needed in EditInteractionForm
            interactionToEdit={interactionToEdit} // Pass the interaction to edit
            interactions={interactions}
            onClose={handleEditFormToggle}
          />
        )}
    </div>
  );
};

export default InteractionsSection;
