import { inject } from "@angular/core"
import { UsuarioService } from "../services/usuario.service"
import { Router } from "@angular/router"

export const authGuard = () => {
    const userService = inject(UsuarioService)
    const router = inject(Router)

    if(userService.estaLogado()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false
    }


}