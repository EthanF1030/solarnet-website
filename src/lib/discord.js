export async function getDiscordGuildMember(accessToken) {
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId) {
    throw new Error("Missing DISCORD_GUILD_ID in .env.local");
  }

  const response = await fetch(
    `https://discord.com/api/users/@me/guilds/${guildId}/member`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function userHasStaffRole(accessToken) {
  if (!accessToken) {
    return false;
  }

  const member = await getDiscordGuildMember(accessToken);

  if (!member?.roles) {
    return false;
  }

  const allowedRoleIds = [
    process.env.DISCORD_STAFF_ROLE_ID,
    process.env.DISCORD_OWNER_ROLE_ID,
    process.env.DISCORD_MANAGER_ROLE_ID,
  ].filter(Boolean);

  return member.roles.some((roleId) => allowedRoleIds.includes(roleId));
}