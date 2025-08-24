import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

world.beforeEvents.chat.subscribe((e) => {
    const msg = e.message.trim();
    const source = e.sender;

    if (msg === "!test") {
        e.cancel = true;

        const form = new ActionFormData()
            .title("⚙️ Ustawienia")
            .body("Wybierz opcję:")
            .button("✅ Test");

        form.show(source).then((response) => {
            if (response.canceled) {
                source.sendMessage("❌ Formularz został anulowany.");
            } else {
                source.sendMessage("✅ Wybrałeś przycisk testowy.");
            }
        }).catch((error) => {
            source.sendMessage(`🚫 Błąd formularza: ${error}`);
        });
    }
});