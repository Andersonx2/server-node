export const generateSlug = (text: string): string => {
    return text
        .normalize("NFD") // Remove acentos
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .toLowerCase() // Converte para minúsculas
        .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .replace(/-+/g, "-"); // Remove hífens duplicados
}
