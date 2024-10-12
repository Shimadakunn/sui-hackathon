module my_nft_contract_ev::my_nft_contract_ev {
    use sui::dynamic_field as df;
    use sui::url::{Self, Url};
    use std::string;
    use sui::event;

    /// An example NFT that can be minted by anybody and evolves through states dynamically
    public struct EvolutionNFT has key, store { // Ajout de l'abilité store
        id: UID,
    }

    public struct StateData has key, store { // Assurez-vous que cette structure a également l'abilité store
        id: UID, // Required for key ability
        state: u8,
        image: Url,
    }

    // ===== Events =====

    public struct NFTMinted has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }

    public struct NFTStateChanged has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The new state of the NFT
        new_state: u8,
    }

    // ===== Public view functions =====

    /// Get the current state of the NFT
    public fun current_state(nft_id: &UID): u8 {
        let state_data: &StateData = df::borrow(nft_id, b"state_data");
        state_data.state
    }

    /// Get the current image URL for the NFT
    public fun current_image(nft_id: &UID): &Url {
        let state_data: &StateData = df::borrow(nft_id, b"state_data");
        &state_data.image
    }

    // ===== Entrypoints =====

    #[allow(lint(self_transfer))]
    /// Create a new dynamic evolution NFT
    public fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = ctx.sender();

        // Create the NFT object
        let mut nft = EvolutionNFT {
            id: object::new(ctx),
        };

        // Initial state data
        let initial_state = StateData {
            id: object::new(ctx), // Create a unique ID for the state data
            state: 0, // Initial state
            image: url::new_unsafe_from_bytes(b"https://www.handinorme.com/8677-thickbox_default/plaque-signaletique-en-drapeau-plexi-niveau-1-.jpg"),
        };

        // Store the state data in dynamic fields
        df::add(&mut nft.id, b"state_data", initial_state);

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: string::utf8(name),
        });

        transfer::public_transfer(nft, sender);
    }

    /// Change the state of the NFT
   public fun change_state(
    nft_id: &mut UID,
    new_state: u8,
    ctx: &mut TxContext
) {
    // Ensure the new state is valid (0, 1, or 2)
    assert!(new_state < 3, 0); // Change 3 to the number of states

    let new_image: Url; // Déclaration de new_image en tant que Url

    // Utilisation de match pour déterminer l'URL d'image
    match (new_state) {
    0 => new_image = url::new_unsafe_from_bytes(b"https://www.handinorme.com/8677-thickbox_default/plaque-signaletique-en-drapeau-plexi-niveau-1-.jpg"),
    1 => new_image = url::new_unsafe_from_bytes(b"https://www.handinorme.com/8684-thickbox_default/plaque-signaletique-en-drapeau-plexi-niveau-2-.jpg"),
    2 => new_image = url::new_unsafe_from_bytes(b"https://www.handinorme.com/8529-thickbox_default/plaque-signaletique-en-plexiglas-plexi-niveau-3-.jpg"),
    _ => new_image = url::new_unsafe_from_bytes(b""), // Fallback for any other value
};

    // Update state data in dynamic fields
    let state_data: &mut StateData = df::borrow_mut(nft_id, b"state_data");
    state_data.state = new_state;
    state_data.image = new_image;
 

    event::emit(NFTStateChanged {
        object_id: object::uid_to_inner(nft_id), 
        new_state,
    });
}
}